import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1648840219783 implements MigrationInterface {
    name = 'migrationName1648840219783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`payments\`
            ADD CONSTRAINT \`FK_43d19956aeab008b49e0804c145\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`payments\`
            ADD CONSTRAINT \`FK_00097d3b3147848e3585aabb433\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`payments\`
            ADD CONSTRAINT \`FK_b2731e10aef7f886a08c552290e\` FOREIGN KEY (\`studentId\`) REFERENCES \`students\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
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
            ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_b2731e10aef7f886a08c552290e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_00097d3b3147848e3585aabb433\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_43d19956aeab008b49e0804c145\`
        `);
    }

}
