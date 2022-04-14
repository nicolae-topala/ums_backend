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
    onDelete: "SET NULL",
  })
  @JoinColumn()
  course!: Courses;

  static async getStudentGrades(id: number) {
    console.log("The ID ", id);
    return await Student_Courses.createQueryBuilder("student_courses")
      .select("finalGrade")
      .addSelect("courses")
      .innerJoin("student_courses.student", "students")
      .innerJoin("student_courses.course", "courses")
      .where("students.id = :id", { id })
      .andWhere("courses.id = student_courses.courseId")
      .getRawMany();
  }
}
