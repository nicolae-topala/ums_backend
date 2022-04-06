import express from "express";
import cors from "cors";

import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const main = async () => {
  await connect();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.listen(3001, () => {
    logger.info("Server running on port 3001");
  });

  routes(app);
};

main().catch((err) => {
  logger.error(err);
});
