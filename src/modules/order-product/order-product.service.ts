import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { QueryRunner, Repository } from 'typeorm';
import { OrderProductEntity } from 'src/modules/order-product/entities/order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createMany(
    products: CreateOrderProductDto[],
    orderId: string,
    queryRunner: QueryRunner,
  ) {
    let subtotal = 0;

    const orderProductInstances = await Promise.all(
      products.map(async (p) => {
        const product = await this.productRepository.findOne({
          where: {
            id: p.productId,
          },
        });

        if (!product) {
          throw new Error('Product not found');
        }

        const orderProductInstance = plainToInstance(OrderProductEntity, {
          orderId,
          productId: p.productId,
          quantity: p.quantity,
        });

        subtotal += product.price * p.quantity;

        return orderProductInstance;
      }),
    );

    await queryRunner.manager.save<OrderProductEntity>(orderProductInstances);

    return subtotal;
  }
}
