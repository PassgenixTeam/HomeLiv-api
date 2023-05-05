import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  AddressDto,
  ShippingAddressDto,
} from 'src/modules/user/dto/request/address.dto';

class ProductOrder {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsString()
  productId: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: AddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ type: ShippingAddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  shippingMethod: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  note: string;

  @ApiProperty({ type: [ProductOrder] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];
}
