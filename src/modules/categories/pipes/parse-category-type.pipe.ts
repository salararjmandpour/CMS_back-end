import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { categoryTypeQueryPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class ParseCategoryType implements PipeTransform {
  transform(value: any) {
    if (!categoryTypeQueryPattern.test(value)) {
      throw new BadRequestException(
        ResponseMessages.TYPE_SHULDE_BE_PRODUCT_OR_POST,
      );
    }
    return value;
  }
}
