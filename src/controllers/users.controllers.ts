import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import { changePassword } from "../service/user.service";

// Schemas
import { ChangePasswordInput } from "../Schema/users.schema";

export async function changePasswordHandler(
  req: Request<{}, {}, ChangePasswordInput["body"]>,
  res: Response
) {
  try {
    const user = await changePassword(req.body);
    res.send({ message: "Password changed successfully" });
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
