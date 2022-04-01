import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1648841024609 implements MigrationInterface {
    name = 'migrationName1648841024609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_42dc3c1fa59ce4a36a19cff2721\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`studentId\` \`studentId\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_42dc3c1fa59ce4a36a19cff2721\` FOREIGN KEY (\`studentId\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_42dc3c1fa59ce4a36a19cff2721\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`studentId\` \`studentId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_42dc3c1fa59ce4a36a19cff2721\` FOREIGN KEY (\`studentId\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
