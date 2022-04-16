import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import { changeEmail, changePassword, getUser } from "../service/user.service";

// Schemas
import { ChangeEmailInput, ChangePasswordInput } from "../Schema/users.schema";

export async function changePasswordHandler(
  req: Request<{}, {}, ChangePasswordInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user.id;
    const isValid = await changePassword({ ...req.body, id: userId });

    if (!isValid) return res.status(403).send("Wrong password!");
    return res.send("Password changed successfully!");
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}

export async function changeEmailHandler(
  req: Request<{}, {}, ChangeEmailInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user.id;
    const isValid = await changeEmail({ ...req.body, id: userId });

    if (!isValid) return res.status(404).send("User doesn't exist !");
    return res.send("Email changed successfully!");
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const data = await getUser(userId);
    if (!data) return res.status(404).send("User doesn't exist !");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}
