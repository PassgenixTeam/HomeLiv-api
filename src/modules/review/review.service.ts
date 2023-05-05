import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from 'src/modules/review/entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  create(createReviewDto: CreateReviewDto, userId: string) {
    const reviewInstance = plainToInstance(ReviewEntity, createReviewDto);

    reviewInstance.userId = userId;

    return this.reviewRepository.save(reviewInstance);
  }

  findAll(productId: string) {
    return this.reviewRepository.find({
      where: {
        productId,
      },
    });
  }

  async remove(id: string, userId: string) {
    const review = await this.reviewRepository.findOne({
      where: {
        id,
      },
    });

    if (!review) {
      throw new Error('Review not found');
    }

    if (review.userId !== userId) {
      throw new Error('You are not authorized to delete this review');
    }

    return this.reviewRepository
      .createQueryBuilder()
      .delete()
      .from(ReviewEntity)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId })
      .execute();
  }
}
