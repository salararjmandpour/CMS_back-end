import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ResponseMessages } from '../constants/response-messages.constant';
import { EXCLUDE_PUBLIC_SETTING_KEY } from '../decorators/exclude-public-settings.decorator';
import { PublicSettingsRepository } from 'src/modules/settings/repositories/public-settings.repository';

@Injectable()
export class RequiredPublicSettingsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private publicSettingsRepo: PublicSettingsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isExclude = this.reflector.getAllAndOverride<boolean>(
      EXCLUDE_PUBLIC_SETTING_KEY,
      [context.getHandler(), context.getClass()],
    );
    const activate = await this.setHttpHeader(isExclude);
    if (!activate) {
      throw new UnprocessableEntityException(
        ResponseMessages.PLEASE_ENTER_SITE_ADDRESS_AND_ROUTE_ADDRESS_IN_PUBLIC_SETTINGS,
      );
    }
    return true;
  }

  async setHttpHeader(isExclude: boolean): Promise<boolean> {
    try {
      const pubcliSettings = await this.publicSettingsRepo.findAll();
      if (
        pubcliSettings.length === 0 ||
        pubcliSettings[0]?.siteAddress === undefined ||
        pubcliSettings[0]?.routeAddress === undefined
      ) {
        return isExclude;
      }

      return true;
    } catch (_) {
      return isExclude;
    }
  }
}
