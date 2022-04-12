import { omit } from "lodash";

// Entities
import { Students } from "../Entities/Students.entity";

export async function getStudent({ id }: { id: number }) {
  const student = await Students.findStudent(id);

  return omit(student, "students_id", "studyfields_id");
}
