import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import { getStudent } from "../service/students.service";

export async function getStudentHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getStudent({ id: studentId });

    if (!data) return res.status(404).send("No student found!");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
