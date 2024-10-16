import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SmsSettingsRepository } from './repositories/sms-settings.repository';
import { SlugSettingsRepository } from './repositories/slug-settings.repository';
import { EmailSettingsRepository } from './repositories/email-settings.repository';
import { PublicSettingsRepository } from './repositories/public-settings.repository';
import { SetSmsConfigDto } from './dtos/set-sms-config.dto';
import { SetSlugCnfigDto } from './dtos/set-slug-config.dto';
import { SetEmailConfigDto } from './dtos/set-email-config.dto';
import { SetPublicConfigDto } from './dtos/set-public-config.dto';
import { copyObject } from 'src/core/utils/copy-object';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { getTimezone, setDefaultTimezone } from 'src/core/utils/timezone.util';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { SetReadingConfigDto } from './dtos/set-reading-setting.dto';
import { ReadingSettingsRepository } from './repositories/reading-settings.repository';

@Injectable()
export class SettingsService {
  constructor(
    private smsSettingsRepository: SmsSettingsRepository,
    private slugSettingsRepository: SlugSettingsRepository,
    private emailSettingsRepository: EmailSettingsRepository,
    private publicSettingsRepository: PublicSettingsRepository,
    private readingSettingsRepository: ReadingSettingsRepository,
  ) {}

  // *** get public settings ***
  async getPublicConfig(): Promise<ResponseFormat<any>> {
    let publicSettings = await this.publicSettingsRepository.findAll();
    if (!publicSettings || publicSettings.length === 0) {
      throw new NotFoundException(
        ResponseMessages.NOT_CONFIGURED_PUBLIC_SETTINGS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        publicSettings: {
          ...copyObject(publicSettings[0]),
          localTime: new Date().toLocaleString('fa-IR', {
            timeZone: 'Asia/Tehran',
          }),
          utcTime: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        },
      },
    };
  }

  // *** set public settings ***
  async setPublicConfig(
    data: SetPublicConfigDto,
  ): Promise<ResponseFormat<any>> {
    // check validate timezone
    if (data.timezone) {
      const timezone = getTimezone(data.timezone);
      if (!timezone) {
        throw new BadRequestException(ResponseMessages.INVALID_TIMEZONE);
      }
    }

    // check if it is not config, create config
    const publicSettings = await this.publicSettingsRepository.findAll();
    if (!publicSettings || publicSettings.length === 0) {
      const createdResult = await this.publicSettingsRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_PUBLIC_CONFIG,
        );
      }

      // set timezone
      if (data.timezone) setDefaultTimezone(data.timezone);

      return {
        statusCode: HttpStatus.CREATED,
        message: ResponseMessages.CONFIGURED_SUCCESSFULLY,
        data: {
          publicSettings: {
            ...copyObject(publicSettings[0]),
            localTime: new Date().toLocaleString('fa-IR', {
              timeZone: 'Asia/Tehran',
            }),
            utcTime: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
          },
        },
      };
    }

    const documentId = publicSettings?.[0]?._id?.toString();

    // update config
    const updateResult = await this.publicSettingsRepository.findAndUpdate(
      documentId,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_PUBLIC_CONFIG,
      );
    }

    // set timezone
    if (data.timezone) setDefaultTimezone(data.timezone);

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.CONFIGURED_SUCCESSFULLY,
      data: {
        publicSettings: {
          ...copyObject(publicSettings[0]),
          localTime: new Date().toLocaleString('fa-IR', {
            timeZone: 'Asia/Tehran',
          }),
          utcTime: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        },
      },
    };
  }

  // *** get email config ***
  async getEmailConfig(): Promise<ResponseFormat<any>> {
    let emailSettings = await this.emailSettingsRepository.findAll();
    if (!emailSettings || emailSettings.length === 0) {
      throw new NotFoundException(
        ResponseMessages.NOT_CONFIGURED_EMAIL_SETTINGS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        emailSettings: emailSettings[0],
      },
    };
  }

  // *** set email config ***
  async setEmailConfig(data: SetEmailConfigDto): Promise<ResponseFormat<any>> {
    let emailSettings = await this.emailSettingsRepository.findAll();

    if (!emailSettings || emailSettings.length === 0) {
      const createdResult = await this.emailSettingsRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_EMAIL_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          emailSettings: createdResult,
        },
      };
    }

    const documentId = emailSettings[0]._id.toString();

    const updateResult: any = await this.emailSettingsRepository.findAndUpdate(
      documentId,
      {
        host: data.host,
        port: data.port,
        user: data.user,
        pass: data.pass,
        senderEmail: data.senderEmail,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_EMAIL,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        emailSettings: updateResult,
      },
    };
  }

  // *** get sms config ***
  async getSmsConfig(): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsSettingsRepository.findAll();
    if (!smsSettings || smsSettings.length === 0) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_SMS_CONFIG);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        smsSettings: smsSettings[0],
      },
    };
  }

  // *** set sms config ***
  async setSmsConfig(data: SetSmsConfigDto): Promise<ResponseFormat<any>> {
    let smsSettings = await this.smsSettingsRepository.findAll();

    if (!smsSettings || smsSettings.length === 0) {
      const createdResult = await this.smsSettingsRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_SMS_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          smsSettings: createdResult,
        },
      };
    }

    const documentId = smsSettings?.[0]?._id?.toString();
    const updateResult = await this.smsSettingsRepository.findAndUpdate(
      documentId,
      {
        panel: data.panel,
        username: data.username,
        password: data.password,
        senderNumber: data.senderNumber,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_SMS,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        smsSettings: updateResult,
      },
    };
  }

  // *** get slug config ***
  async getSlugConfig(): Promise<ResponseFormat<any>> {
    let slugSettings = await this.slugSettingsRepository.findAll();
    if (!slugSettings || slugSettings.length === 0) {
      throw new NotFoundException(
        ResponseMessages.NOT_CONFIGURED_SLUG_SETTINGS,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        slugSettings: slugSettings[0],
      },
    };
  }

  // *** set slug config ***
  public async setSlugConfig(data: SetSlugCnfigDto) {
    const slugSettings = await this.slugSettingsRepository.findAll();

    if (!slugSettings || slugSettings.length === 0) {
      const createdResult = await this.slugSettingsRepository.create(data);
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_SLUG_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          slugSettings: createdResult,
        },
      };
    }

    const documentId = slugSettings?.[0]._id.toString();
    const updateResult = await this.slugSettingsRepository.findAndUpdate(
      documentId,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_SLUG,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        slugSettings: updateResult,
      },
    };
  }


  //----------------- set reading setting ------------------
  public async setReadingConfig(data: SetReadingConfigDto) {
    const readingSettings = await this.readingSettingsRepository.findAll();
    if (!readingSettings || readingSettings.length === 0) {
      const createdResult = await this.readingSettingsRepository.create(data)
      if (!createdResult) {
        throw new InternalServerErrorException(
          ResponseMessages. FAILED_CREATE_READING_CONFIG,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          slugSettings: createdResult,
        },
      };
    }

    const documentId = readingSettings?.[0]._id.toString();
    const updateResult = await this.readingSettingsRepository.findAndUpdate(
      documentId,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SET_CONFIG_SLUG,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        slugSettings: updateResult,
      },
    };
  }

  //----------------- get reading setting ------------------
  async getReadingConfig(): Promise<ResponseFormat<any>> {
      let readingSettings = await this.readingSettingsRepository.findAll();
      if (!readingSettings || readingSettings.length === 0) {
        throw new NotFoundException(
          ResponseMessages.NOT_CONFIGURED_READING_SETTINGS,
        );
      }
  
      return {
        statusCode: HttpStatus.OK,
        data: {
          readingSettings: readingSettings[0],
        },
      };
    }
}
