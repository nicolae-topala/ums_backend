import { omit } from "lodash";

// Entities
import { Students } from "../Entities/Students.entity";
import { Courses } from "../Entities/Courses.entity";
import { Student_Courses } from "../Entities/Student_Courses.entity";

export async function getStudent(id: number) {
  const student = await Students.findStudent(id);

  return omit(student, "students_id", "studyfields_id");
}

export async function getCurriculum(id: number) {
  const student = await Students.findOneBy({ id: id });
  if (!student) return false;

  const courses = await Courses.findBy({ studyFieldId: student.studyFieldId });
  return courses;
}

export async function getGrades(id: number) {
  const student = await Students.findOneBy({ id: id });
  if (!student) return false;

  const grades = await Student_Courses.getStudentGrades(id);
  if (!grades) return false;
  return grades;
}
