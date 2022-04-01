import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "mysql",
  database: "ums_db_test",
  host: "localhost",
  username: "root",
  password: "123321",
  logging: true,
  synchronize: false,
  entities: ["src/Entities/**/*.ts"],
  migrations: ["src/Migrations/**/*.ts"],
});

export default myDataSource;
