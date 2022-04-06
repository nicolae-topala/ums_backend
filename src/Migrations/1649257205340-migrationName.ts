import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1649257205340 implements MigrationInterface {
    name = 'migrationName1649257205340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`sessions\`
            ADD \`userAgent\` varchar(255) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`sessions\` DROP COLUMN \`userAgent\`
        `);
    }

}
