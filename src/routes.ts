import { Express, Request, Response } from "express";

// Middleware
import requireUser from "./Middleware/requireUser";
import validateResource from "./Middleware/validateResource";

// Controllers
import {
  changeEmailHandler,
  changePasswordHandler,
  getUserHandler,
} from "./controllers/users.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/sessions.controller";
import {
  getCurriculumHandler,
  getGradesHandler,
  getStudentHandler,
} from "./controllers/students.controller";

// Schemas
import { changePasswordSchema, changeEmailSchema } from "./Schema/users.schema";
import { createSessionSchema } from "./Schema/sessions.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

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

  // Students
  app.get("/api/students", requireUser, getStudentHandler);
  app.get("/api/students/curriculum", requireUser, getCurriculumHandler);
  app.get("/api/students/grades", requireUser, getGradesHandler);

  // Courses
}

export default routes;
