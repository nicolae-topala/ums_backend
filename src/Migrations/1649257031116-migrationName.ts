import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1649257031116 implements MigrationInterface {
    name = 'migrationName1649257031116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`sessions\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`valid\` tinyint NOT NULL DEFAULT 1,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NULL,
                \`userId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`sessions\`
            ADD CONSTRAINT \`FK_57de40bc620f456c7311aa3a1e6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`sessions\` DROP FOREIGN KEY \`FK_57de40bc620f456c7311aa3a1e6\`
        `);
        await queryRunner.query(`
            DROP TABLE \`sessions\`
        `);
    }

}
