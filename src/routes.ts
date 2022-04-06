import { Express, Request, Response } from "express";

import validateResource from "./Middleware/validateResource";

// Controllers
import { changePasswordHandler } from "./controllers/users.controllers";
import { createUserSessionHandler } from "./controllers/sessions.controller";

// Schemas
import { changePasswordSchema } from "./Schema/users.schema";
import { createSessionSchema } from "./Schema/sessions.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.patch(
    "/api/changePassword",
    validateResource(changePasswordSchema),
    changePasswordHandler
  );

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
}

export default routes;
