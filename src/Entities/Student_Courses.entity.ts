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
}
