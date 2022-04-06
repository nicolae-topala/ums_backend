import { Express, Request, Response } from "express";

import validateResource from "./Middleware/validateResource";
import { changePasswordSchema } from "./Schema/users.schema";
import { changePasswordHandler } from "./controllers/users.controllers";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.patch(
    "/api/changePassword",
    validateResource(changePasswordSchema),
    changePasswordHandler
  );
}

export default routes;
