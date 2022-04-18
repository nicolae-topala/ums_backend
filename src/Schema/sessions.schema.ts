import { object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    createSessionInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: test
 *        password:
 *          type: string
 *          default: test
 *
 *    createSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 *
 *    deleteSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 *
 *    Session:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        valid:
 *          type: string
 *        userAgent:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        userId:
 *          type: number
 */

export const createSessionSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});
