import { object, string, z } from "zod";

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

export type ChangePasswordInput = Omit<
  z.infer<typeof changePasswordSchema>,
  "body.passwordConfirm"
>;
export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
