import { DataSource } from "typeorm";

// Import dotenv here for creating migrations,
// because yarn generate uses only this file
import dotenv from "dotenv";
dotenv.config();
import config from "config";

const myDataSource = new DataSource({
  type: "mysql",
  database: config.get<string>("dbName"),
  host: config.get<string>("dbHost"),
  username: config.get<string>("dbUsername"),
  password: config.get<string>("dbPassword"),
  logging: true,
  synchronize: false,
  entities: ["src/Entities/**/*.ts"],
  migrations: ["src/Migrations/**/*.ts"],
});

export default myDataSource;
