import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  create(input: CreateCartDto, userId: string) {
    const cartInstance = plainToInstance(CartEntity, input);

    cartInstance.userId = userId;

    return this.cartRepository.save(cartInstance);
  }

  findAll(userId: string) {
    return this.cartRepository.find({
      where: {
        userId,
      },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto, userId: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    await this.cartRepository.update(id, updateCartDto);

    return 'Cart updated successfully';
  }

  async remove(id: string, userId: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .andWhere('userId = :userId', { userId })
      .execute();

    return 'Cart removed successfully';
  }
}
