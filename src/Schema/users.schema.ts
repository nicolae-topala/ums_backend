import { number, object, string, TypeOf } from "zod";

export const changePasswordSchema = object({
  body: object({
    oldPassword: string({
      required_error: "Old password is required",
    }),
    password: string({
      required_error: "New password is required",
    }).min(4, "Password too short, it must be 4 characters long"),
    passwordConfirm: string({
      required_error: "Confirmation password is required",
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  }),
});

export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;
