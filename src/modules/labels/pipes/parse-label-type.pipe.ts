import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { labelTypeQueryPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class ParseLabelTypePipe implements PipeTransform {
  transform(value: any) {
    if (!labelTypeQueryPattern.test(value)) {
      throw new BadRequestException(
        ResponseMessages.TYPE_SHULDE_BE_PRODUCT_OR_POST,
      );
    }
    return value;
  }
}
