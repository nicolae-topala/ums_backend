import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes";

// Utils
import connect from "./utils/connect";
import logger from "./utils/logger";
import swaggerDocs from "./utils/swagger";

// Middleware
import deserializeUser from "./Middleware/deserializeUser";

const main = async () => {
  await connect();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(deserializeUser);
  app.listen(3001, () => {
    logger.info("Server running on port 3001");
  });

  routes(app);
  swaggerDocs(app, 3001);
};

main().catch((err) => {
  logger.error(err);
});
