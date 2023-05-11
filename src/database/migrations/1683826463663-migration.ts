import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1683826463663 implements MigrationInterface {
  name = 'migration1683826463663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "marble" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "light_and_dark_style" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "decorate_the_items" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "kinds_of_large_objects" character varying(100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "kinds_of_large_objects"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "decorate_the_items"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "light_and_dark_style"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "marble"`);
  }
}
