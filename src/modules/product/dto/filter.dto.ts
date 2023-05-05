import { EnumTransform } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SORT_PRODUCT_BY } from 'src/modules/product/enum/product.enum';

export class ProductFilterDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  name: string;

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
}