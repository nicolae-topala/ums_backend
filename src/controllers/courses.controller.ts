import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import { getCurriculum } from "../service/courses.service";

export async function getCurriculumHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getCurriculum({ id: studentId });

    if (data) return res.status(404).send("Student not found !");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}
