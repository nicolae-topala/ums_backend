import { object, string, z } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        status:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *
 *    changePasswordInput:
 *      type: object
 *      required:
 *        - oldPassword
 *        - password
 *        - passwordConfirm
 *      properties:
 *        oldPassword:
 *          type: string
 *          default: test
 *        password:
 *          type: string
 *          default: test
 *        passwordConfirm:
 *          type: string
 *          default: test
 *
 *    changeEmailInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: test
 *
 *    forgotPasswordInput:
 *      type: object
 *      required:
 *        - username
 *      properties:
 *        username:
 *          type: string
 *          default: test
 */

export const changePasswordSchema = object({
  body: object({
    oldPassword: string({
      required_error: "Old password is required!",
    }),
    password: string({
      required_error: "New password is required!",
    }).min(4, "Password too short, it must be 4 characters long!"),
    passwordConfirm: string({
      required_error: "Confirmation password is required!",
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match!",
    path: ["passwordConfirm"],
  }),
});

export const changeEmailSchema = object({
  body: object({
    email: string({
      required_error: "New email is required!",
    }).email("Not a valid email"),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    username: string({
      required_error: "Username is required!",
    }),
  }),
});

export type ChangePasswordInput = Omit<
  z.infer<typeof changePasswordSchema>,
  "body.passwordConfirm"
>;

export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
