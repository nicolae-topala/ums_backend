import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";

// Services
import {
  getCurriculum,
  getGrades,
  getStudent,
} from "../service/students.service";

export async function getStudentHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getStudent({ id: studentId });

    if (!data) return res.status(404).send("No student found!");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}

export async function getCurriculumHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getCurriculum({ id: studentId });

    if (!data) return res.status(404).send("Student not found !");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}

export async function getGradesHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getGrades({ id: studentId });

    if (!data)
      return res
        .status(404)
        .send("Student not found or student has no grades!");
    return res.send(data);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}
