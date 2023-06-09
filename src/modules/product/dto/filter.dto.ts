import { EnumTransform } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  PRODUCT_STYLE,
  ROOM_TYPE,
  SORT_PRODUCT_BY,
} from 'src/modules/product/enum/product.enum';

export class ProductFilterDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  categoryIds: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  minPrice: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ type: String, enum: SORT_PRODUCT_BY, required: false })
  @IsEnum(SORT_PRODUCT_BY)
  @EnumTransform(SORT_PRODUCT_BY)
  @IsOptional()
  sort: SORT_PRODUCT_BY;

  @ApiProperty({ type: String, enum: PRODUCT_STYLE, required: false })
  @IsString()
  @IsOptional()
  @IsEnum(PRODUCT_STYLE)
  @EnumTransform(PRODUCT_STYLE)
  style: PRODUCT_STYLE;

  @ApiProperty({ type: String, enum: ROOM_TYPE, required: false })
  @IsString()
  @IsOptional()
  @IsEnum(ROOM_TYPE)
  @EnumTransform(ROOM_TYPE)
  roomType: ROOM_TYPE;
}
