import { EnumTransform } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import {
  PRODUCT_STYLE,
  ROOM_TYPE,
} from 'src/modules/product/enum/product.enum';

export class CreateProductDto {
  @ApiProperty({ type: String, example: 'Product name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Product description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: String, example: 'Product thumbnail' })
  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;

  @ApiProperty({
    type: [String],
    example: ['Product thumbnail 1', 'Product thumbnail 2'],
  })
  @IsString({ each: true })
  thumbnails: string[];

  @ApiProperty({ type: Number, example: 0 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isSale: boolean;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isHot: boolean;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({ type: String, enum: PRODUCT_STYLE })
  @IsString()
  @IsEnum(PRODUCT_STYLE)
  @EnumTransform(PRODUCT_STYLE)
  style: PRODUCT_STYLE;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isBestSeller: boolean;

  @ApiProperty({ type: Object })
  @IsObject()
  additionalInformation: any;

  @ApiProperty({ type: [String], format: 'uuid' })
  @IsString({ each: true })
  categoryIds: string[];

  @ApiProperty({ type: String, enum: ROOM_TYPE })
  @IsString()
  @IsEnum(ROOM_TYPE)
  @EnumTransform(ROOM_TYPE)
  roomType: ROOM_TYPE;
}
