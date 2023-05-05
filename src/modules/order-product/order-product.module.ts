import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from 'src/modules/order-product/entities/order-product.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductEntity, ProductEntity])],
  controllers: [OrderProductController],
  providers: [OrderProductService],
})
export class OrderProductModule {}
