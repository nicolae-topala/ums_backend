import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Courses } from "./Courses.entity";
import { Students } from "./Students.entity";

@Entity()
export class Student_Courses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  final_grade!: number;

  @ManyToOne(() => Students, (Students) => Students.studentCourses)
  student!: Students;

  @ManyToOne(() => Courses, (Courses) => Courses.studentCourses)
  course!: Courses;
}
