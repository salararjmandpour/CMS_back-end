import { Request } from 'express';
import { Body, Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtoc/create-address.dto';
import { CreateAddressDecorator } from './decorators/create-address.decorator';

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
}
