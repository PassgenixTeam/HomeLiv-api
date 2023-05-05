import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { Auth, AuthUser } from '@app/core';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ManyOrderDto } from 'src/modules/order/dto/response/many-order-response.dto';
import { OrderDetailDto } from 'src/modules/order/dto/response/detail-order-response.dto copy';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUser('id') userId: string,
  ) {
    return this.orderService.create(createOrderDto, userId);
  }

  @Get()
  @Auth()
  @ApiOkResponse({
    description: 'The records has been successfully fetched.',
    type: ManyOrderDto,
  })
  findAll(@AuthUser('id') userId: string) {
    return this.orderService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: OrderDetailDto,
  })
  @Auth()
  findOne(@Param('id') id: string, @AuthUser('id') userId: string) {
    return this.orderService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
}
