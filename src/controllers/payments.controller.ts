import { Request, Response } from "express";

import { getPayments } from "../service/payments.service";

export async function getPaymentsHandler(req: Request, res: Response) {
  try {
    const studentId = res.locals.user.studentId;

    const data = await getPayments(studentId);
    if (!data) return res.status(404).send("Student not found or no Payments!");
    return res.send(data);
  } catch (e: any) {
    return res.status(400).send(e.issues.message);
  }
}
