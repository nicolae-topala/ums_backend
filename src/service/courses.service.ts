// Entities
import { Courses } from "../Entities/Courses.entity";
import { Students } from "../Entities/Students.entity";

export async function getCurriculum({ id }: { id: number }) {
  const student = await Students.findOneBy({ id: id });
  if (!student) return false;

  const courses = await Courses.findBy({ studyFieldId: student.studyFieldId });
  return courses;
}
