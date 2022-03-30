import { DataSource } from "typeorm";
import config from "config";

import { Users } from "../Models/Users";
import logger from "./logger";

async function connect() {
  try {
    let dataSource = new DataSource({
      type: "mysql",
      database: config.get<string>("database"),
      username: config.get<string>("username"),
      password: config.get<string>("password"),
      logging: config.get<boolean>("logging"),
      synchronize: config.get<boolean>("synchronize"),
      entities: config.get("entities"),
    });

    let connection = await dataSource.initialize();

    logger.info("Connected to DB !");
  } catch (e) {
    logger.error("Could not connect to DB!");
    process.exit(1);
  }
}

export default connect;
