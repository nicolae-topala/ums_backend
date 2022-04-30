import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Courses } from "./Courses.entity";
import { Students } from "./Students.entity";

export interface GradesDocument {
  courses_id: number;
  courses_code: string;
  courses_name: string;
  courses_type: string;
  courses_category: string;
  courses_gradingSystem: string;
  courses_semesterNumber: number;
  courses_yearNumber: number;
  courses_weeksNumber: number;
  courses_ects: number;
  courses_examinationForm: string;
  courses_minimumGrade: number;
  courses_studyFieldId: number;
  finalGrade: number;
}

@Entity()
export class Student_Courses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float", nullable: true })
  finalGrade!: number;

  @Column()
  studentId!: number;

  @Column()
  courseId!: number;

  @ManyToOne(() => Students, (Students: Students) => Students.studentCourses, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  student!: Students;

  @ManyToOne(() => Courses, (Courses: Courses) => Courses.studentCourses, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn()
  course!: Courses;

  static async getStudentGrades(id: number): Promise<GradesDocument[]> {
    const data = await Student_Courses.createQueryBuilder("student_courses")
      .select("finalGrade")
      .addSelect("courses")
      .innerJoin("student_courses.student", "students")
      .innerJoin("student_courses.course", "courses")
      .where("students.id = :id", { id })
      .andWhere("courses.id = student_courses.courseId")
      .getRawMany();

    return data;
  }
}
