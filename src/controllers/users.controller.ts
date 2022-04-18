import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import {
  changeEmail,
  changePassword,
  findUser,
  getUser,
  createToken,
} from "../service/user.service";

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

export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const user = await findUser({ username: req.body.username });

    if (!user)
      return res.status(404).send("There is no user with such username!");

    // Create random substring, we use 2,13 to create 11 long string. first 2 characters are 0. , so we don't substract them
    const token = Math.random().toString(36).substring(2, 13);
    const createTokens = await createToken(user.id, token);
    return res.send(createTokens);
  } catch (e: any) {
    return res.status(400).send(e.issues.message);
  }
}
