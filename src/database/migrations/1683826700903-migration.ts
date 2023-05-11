import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1683826700903 implements MigrationInterface {
  name = 'migration1683826700903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "room_type" character varying(100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "room_type"`);
  }
}
