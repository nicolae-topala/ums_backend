import myDataSource from "./dataSource";
import logger from "./logger";

async function connect() {
  try {
    await myDataSource.initialize().then(async (connection) => {
      console.log("connection");
      await connection.runMigrations();
    });

    logger.info("Connected to DB !");
  } catch (e) {
    logger.error("Could not connect to DB!");
    process.exit(1);
  }
}

export default connect;
