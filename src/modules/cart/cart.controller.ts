import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, AuthUser } from '@app/core';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Auth()
  create(@Body() createCartDto: CreateCartDto, @AuthUser('id') userId: string) {
    return this.cartService.create(createCartDto, userId);
  }

  @Get()
  @Auth()
  findAll(@AuthUser('id') userId: string) {
    return this.cartService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @AuthUser('id') userId: string,
  ) {
    return this.cartService.update(id, updateCartDto, userId);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @AuthUser('id') userId: string) {
    return this.cartService.remove(id, userId);
  }
}
