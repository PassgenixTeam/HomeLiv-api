import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { OrderProductService } from 'src/modules/order-product/order-product.service';
import { v4 as uuid } from 'uuid';
import { ResponseTransform } from '@app/common';
import { ManyOrderDto } from 'src/modules/order/dto/response/many-order-response.dto';
import { OrderDetailDto } from 'src/modules/order/dto/response/detail-order-response.dto copy';
import { ORDER_STATUS } from 'src/modules/order/enums/order.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private orderProductService: OrderProductService,
    private dataSource: DataSource,
  ) {}

  private logger = new Logger(OrderService.name);

  async create(input: CreateOrderDto, userId: string) {
    const orderInstance = plainToInstance(OrderEntity, input);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      orderInstance.userId = userId;
      orderInstance.status = ORDER_STATUS.PENDING;

      const order = await queryRunner.manager.save(orderInstance);

      const subtotal = await this.orderProductService.createMany(
        input.products,
        order.id,
        queryRunner,
      );

      order.subtotal = subtotal;
      order.shippingFee = 0;
      order.total = subtotal + order.shippingFee;

      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return 'Order created successfully';
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @ResponseTransform(ManyOrderDto)
  findAll(userId: string) {
    return this.orderRepository.find({ where: { userId } });
  }

  @ResponseTransform(OrderDetailDto)
  async findOne(id: string, userId: string) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderProducts', 'orderProducts')
      .leftJoin('orderProducts.product', 'product')
      .where('order.id = :id', { id })
      .andWhere('order.userId = :userId', { userId })
      .addSelect([
        'orderProducts.id',
        'product.id',
        'product.price',
        'product.salePrice',
      ])
      .getOne();

    if (!order) {
      throw new Error('Order not found');
    }

    const products = order.orderProducts.map(
      (orderProduct) => orderProduct.product,
    );

    delete order.orderProducts;

    return {
      ...order,
      products,
    };
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
