import {
  BaseEntity,
  ObjectTransformToString,
  StringTransformToObject,
} from '@app/common';
import { OrderProductEntity } from 'src/modules/order-product/entities/order-product.entity';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  @ObjectTransformToString()
  @StringTransformToObject()
  address: AddressDto;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ObjectTransformToString()
  @StringTransformToObject()
  shippingAddress: ShippingAddressDto;

  @Column({ type: 'float', default: 0 })
  subtotal: number;

  @Column({ type: 'float', default: 0 })
  shippingFee: number;

  @Column({ type: 'float', default: 0 })
  total: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paymentStatus: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  shippingMethod: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  shippingStatus: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  note: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // Relations

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    onDelete: 'CASCADE',
  })
  orderProducts: OrderProductEntity[];
}
