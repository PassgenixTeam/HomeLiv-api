import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { categories, myCategories } from 'src/database/data-fake/data-fake';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const categoryInstance = plainToInstance(CategoryEntity, createCategoryDto);
    return this.categoryRepository.save(categoryInstance);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  initCategories() {
    const data = myCategories.map((category) => ({
      name: category,
      thumbnailUrl: 'https://picsum.photos/seed/picsum/200/300',
    }));

    return this.categoryRepository.save(data);
  }
}
