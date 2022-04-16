import { Payments } from "../Entities/Payments.entity";
import { Students } from "../Entities/Students.entity";

export async function getPayments(id: number) {
  const student = await Students.findOneBy({ id: id });
  if (!student) return false;

  const data = await Payments.getPayments(id);
  return data;
}
