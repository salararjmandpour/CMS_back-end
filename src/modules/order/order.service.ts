import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  create(body: CreateOrderDto) {
    return this.orderRepository.create(body);
  }
}
