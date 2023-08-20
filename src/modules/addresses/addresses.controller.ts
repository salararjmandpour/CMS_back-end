import { Request } from 'express';
import { Body, Controller, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtoc/create-address.dto';
import { CreateAddressDecorator } from './decorators/create-address.decorator';
import { UpdateAddressDecorator } from './decorators/update-address.decorator';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { UpdateAddressDto } from './dtoc/update-address.dto';

@ApiBearerAuth()
@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @CreateAddressDecorator()
  create(@Body() body: CreateAddressDto, @Req() req: Request) {
    body.user = req.user._id;
    return this.addressesService.create(body);
  }

  @UpdateAddressDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, body);
  }
}
