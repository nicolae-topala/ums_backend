import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course_Professors } from "./Course_Professors.entity";
import { Faculties } from "./Faculties.entity";
import { Payments } from "./Payments.entity";
import { Student_Courses } from "./Student_Courses.entity";
import { Study_Fields } from "./Study_Fields.entity";

@Entity()
export class Courses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 10 })
  code!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ nullable: true })
  category!: string;

  @Column({ nullable: true })
  gradingSystem!: string;

  @Column({ nullable: true })
  semesterNumber!: number;

  @Column({ nullable: true })
  yearNumber!: number;

  @Column({ nullable: true })
  weeksNumber!: number;

  @Column({ nullable: true })
  ects!: number;

  @Column({ nullable: true })
  examinationForm!: string;

  @Column({ nullable: true })
  minimumGrade!: number;

  @Column()
  studyFieldId!: number;

  @ManyToOne(
    () => Study_Fields,
    (Study_Fields: Study_Fields) => Study_Fields.courses,
    {
      onDelete: "SET NULL",
      nullable: true,
    }
  )
  @JoinColumn()
  studyField!: Faculties;

  @OneToMany(() => Payments, (Payments: Payments) => Payments.course)
  payments!: Payments[];

  @OneToMany(
    () => Student_Courses,
    (Student_Courses: Student_Courses) => Student_Courses.course
  )
  studentCourses!: Student_Courses[];

  @OneToMany(
    () => Course_Professors,
    (Course_Professors: Course_Professors) => Course_Professors.course
  )
  courseProfessors!: Course_Professors[];
}
