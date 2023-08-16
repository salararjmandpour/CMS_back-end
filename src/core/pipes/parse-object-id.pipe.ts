import { isValidObjectId } from 'mongoose';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ResponseMessages } from '../constants/response-messages.constant';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    const isValidId = isValidObjectId(value);

    if (!isValidId) {
      throw new BadRequestException(ResponseMessages.INVALID_OBJECT_ID);
    }

    return value;
  }
}
