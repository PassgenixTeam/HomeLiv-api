import { ROLE, StringTransformToObject } from '@app/common';
import { BaseResponseDto, ResponseDto } from '@app/common/base/response.base';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';

class ProductOrderDto {
  @Expose()
  @ApiResponseProperty({
    type: String,
    format: 'uuid',
    example: '4193fe42-d58d-486b-8d7a-ea4fd4ca73cb',
  })
  @IsString()
  id: string;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  @IsNumber()
  price: number;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  @IsNumber()
  salePrice: number;
}

export class OrderDetailDto extends BaseResponseDto {
  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  subtotal: number;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  shippingFee: number;

  @Expose()
  @ApiResponseProperty({ type: Number, example: 10 })
  total: number;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'paymentMethod' })
  paymentMethod: string;

  @Expose()
  @ApiResponseProperty({ type: String, example: 'shippingMethod' })
  shippingMethod: string;

  @Expose()
  @ApiResponseProperty({ type: [ProductOrderDto] })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto;

  @Expose()
  @ApiResponseProperty({ type: AddressDto })
  @StringTransformToObject({ toClassOnly: true })
  address: AddressDto;

  @Expose()
  @ApiResponseProperty({ type: ShippingAddressDto })
  @StringTransformToObject({ toClassOnly: true })
  shippingAddress: ShippingAddressDto;
}

export class OrderResponseDto extends ResponseDto {
  @ApiResponseProperty({ type: OrderDetailDto })
  data: OrderDetailDto;
}
