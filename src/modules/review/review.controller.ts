import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Auth, AuthUser } from '@app/core';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from '@app/common';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Auth(ROLE.GUEST)
  create(
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser('id') userId: string,
  ) {
    return this.reviewService.create(createReviewDto, userId);
  }

  @Get('product/:id')
  findAll(@Param('id') productId: string) {
    return this.reviewService.findAll(productId);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @AuthUser('id') userId: string) {
    return this.reviewService.remove(id, userId);
  }
}
