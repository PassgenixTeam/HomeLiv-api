import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

const categories = fs
  .readFileSync(join(__dirname, '../sql/categories.sql'))
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' ');

const product_categories = fs
  .readFileSync(join(__dirname, '../sql/product_categories.sql'))
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' ');

const products = fs
  .readFileSync(join(__dirname, '../sql/products.sql'))
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' ');

export class Seed1683894749436 implements MigrationInterface {
  name = 'seed1683894749436';
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(categories.toString());
    await queryRunner.query(products.toString());
    await queryRunner.query(product_categories.toString());
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('');
  }
}
