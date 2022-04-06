import { Request, Response } from "express";
import logger from "../utils/logger";

import { changePassword } from "../service/user.service";
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
