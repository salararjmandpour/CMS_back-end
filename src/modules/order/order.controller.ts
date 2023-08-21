import { Request } from 'express';
import { Body, Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CreateOrderDecorator } from './decorators/create-order-decorator';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @CreateOrderDecorator()
  create(@Body() body: CreateOrderDto, @Req() req: Request) {
    body.customer = req.user._id;
    return this.orderService.create(body);
  }
}
