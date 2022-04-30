import { Request, Response } from "express";

// Utils
import logger from "../utils/logger";
import { createGradeSheet } from "../utils/pdf.utils";

// Services
import {
  getCurriculum,
  getGrades,
  getStudent,
} from "../service/students.service";

export async function getStudentHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const data = await getStudent(studentId);

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
    const data = await getCurriculum(studentId);

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
    const data = await getGrades(studentId);

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

export async function getGradeSheetHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;
    const student = await getStudent(studentId);
    const data = await getGrades(studentId);

    if (!student) return res.status(404).send("Student not found!");
    if (!data) return res.status(404).send("Student has no grades!");

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${student.students_firstName}_${student.students_lastName}_fisa_matricola.pdf`,
    });
    createGradeSheet(
      (chunk: string) => stream.write(chunk),
      () => stream.end(),
      student,
      data
    );
    return;
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.issues.message);
  }
}
