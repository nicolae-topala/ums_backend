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
import {
  getDiscountsHandler,
  getPaymentsHandler,
} from "./controllers/payments.controller";

// Schemas
import { changePasswordSchema, changeEmailSchema } from "./Schema/users.schema";
import { createSessionSchema } from "./Schema/sessions.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *    tags:
   *      - Healthcheck
   *    description: Responds if the app is up and running
   *    responses:
   *      200:
   *        description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Sessions

  /**
   * @openapi
   * /api/sessions:
   *  post:
   *    tags:
   *      - Sessions
   *    summary: Create a new session
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createSessionInput'
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/createSessionResponse'
   *      401:
   *        description: Invalid username or password
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  /**
   * @openapi
   * /api/sessions:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Sessions
   *    summary: Get sessions
   *    description: Get all user's sessions
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Session'
   */
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  /**
   * @openapi
   * /api/sessions:
   *  delete:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Sessions
   *    summary: Delete sessions
   *    description: Set user's session valid to false
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/deleteSessionResponse'
   */
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // Users

  /**
   * @openapi
   * /api/users:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Get user
   *    description: Get all user's information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   */
  app.get("/api/users", requireUser, getUserHandler);

  /**
   * @openapi
   * /api/users/changePassword:
   *  patch:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Change password
   *    description: Change user's password
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/changePasswordInput'
   *    responses:
   *      200:
   *        description: Success
   */
  app.patch(
    "/api/users/changePassword",
    [requireUser, validateResource(changePasswordSchema)],
    changePasswordHandler
  );

  /**
   * @openapi
   * /api/users/changeEmail:
   *  patch:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Change email
   *    description: Change user's email
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/changeEmailInput'
   *    responses:
   *      200:
   *        description: Success
   */
  app.patch(
    "/api/users/changeEmail",
    [requireUser, validateResource(changeEmailSchema)],
    changeEmailHandler
  );

  // Students

  /**
   * @openapi
   * /api/students:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Students
   *    summary: Get student
   *    description: Get all student's information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Student'
   */
  app.get("/api/students", requireUser, getStudentHandler);

  /**
   * @openapi
   * /api/students/curriculum:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Students
   *    summary: Get curriculum
   *    description: Get student's curriculum information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Curriculum'
   */
  app.get("/api/students/curriculum", requireUser, getCurriculumHandler);

  /**
   * @openapi
   * /api/students/grades:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Students
   *    summary: Get grades
   *    description: Get student's grades information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Grades'
   */
  app.get("/api/students/grades", requireUser, getGradesHandler);

  // Payments

  /**
   * @openapi
   * /api/payments:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Financial
   *    summary: Get payments
   *    description: Get student's payments information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Payment'
   */
  app.get("/api/payments", requireUser, getPaymentsHandler);

  /**
   * @openapi
   * /api/discounts:
   *  get:
   *    security:
   *     - bearerAuth: []
   *    tags:
   *      - Financial
   *    summary: Get discounts
   *    description: Get student's discounts information
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Discount'
   */
  app.get("/api/discounts", requireUser, getDiscountsHandler);
}

export default routes;
