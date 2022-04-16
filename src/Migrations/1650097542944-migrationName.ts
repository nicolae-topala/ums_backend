import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1650097542944 implements MigrationInterface {
    name = 'migrationName1650097542944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`payments\`
            ADD CONSTRAINT \`FK_695e14397813e91c68305d636ee\` FOREIGN KEY (\`discountId\`) REFERENCES \`discounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_695e14397813e91c68305d636ee\`
        `);
    }

}
