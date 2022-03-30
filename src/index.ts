import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import connect from "./utils/connect";
import logger from "./utils/logger";
import { schema } from "./Schema";

const main = async () => {
  await connect();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    logger.info("Server running on port 3001");
  });
};

main().catch((err) => {
  logger.error(err);
});
