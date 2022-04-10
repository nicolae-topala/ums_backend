import { Express, Request, Response } from "express";

import validateResource from "./Middleware/validateResource";

// Middleware
import requireUser from "./Middleware/requireUser";

// Controllers
import {
  changeEmailHandler,
  changePasswordHandler,
  getUserHandler,
} from "./controllers/users.controllers";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/sessions.controller";

// Schemas
import { changePasswordSchema, changeEmailSchema } from "./Schema/users.schema";
import { createSessionSchema } from "./Schema/sessions.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Users
  app.get("/api/users", requireUser, getUserHandler);

  app.patch(
    "/api/users/changePassword",
    [requireUser, validateResource(changePasswordSchema)],
    changePasswordHandler
  );

  app.patch(
    "/api/users/changeEmail",
    [requireUser, validateResource(changeEmailSchema)],
    changeEmailHandler
  );

  // Sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
