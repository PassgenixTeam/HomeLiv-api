import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProductService } from 'src/modules/order-product/order-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { OrderProductEntity } from 'src/modules/order-product/entities/order-product.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderProductEntity, ProductEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProductService],
})
export class OrderModule {}
