import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payments } from "./Payments.entity";
import { Student_Courses } from "./Student_Courses.entity";
import { Study_Fields } from "./Study_Fields.entity";

@Entity()
export class Students extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  birtdate!: Date;

  @Column()
  cnp!: string;

  @Column()
  firstNameMother!: string;

  @Column()
  firstNameFather!: string;

  @Column()
  passport!: string;

  @Column()
  idCard!: string;

  @Column()
  sex!: string;

  @Column()
  citizenship!: string;

  @Column()
  nationality!: string;

  @Column()
  countryBirth!: string;

  @Column()
  cityBirth!: string;

  @Column()
  countyBirth!: string;

  @Column()
  countryResidence!: string;

  @Column()
  cityResidence!: string;

  @Column()
  countyResidence!: string;

  @Column()
  religion!: string;

  @Column()
  minority!: boolean;

  @Column()
  maritalSatus!: string;

  @Column()
  militarySituation!: string;

  @Column()
  militaryBooklet!: string;

  @Column({ type: "year" })
  highschoolGraduation!: Date;

  @Column()
  highschoolBaccalaureate!: number;

  @Column()
  highschoolOlympic!: boolean;

  @Column()
  studyType!: string;

  @Column()
  group!: string;

  @Column()
  admissionGrade!: number;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column()
  academicYear!: string;

  @ManyToOne(() => Study_Fields, (Study_Fields) => Study_Fields.students, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  studyField!: Study_Fields;

  @OneToMany(() => Payments, (Payments) => Payments.student)
  payments!: Payments[];

  @OneToMany(
    () => Student_Courses,
    (Student_Courses) => Student_Courses.student
  )
  studentCourses!: Student_Courses[];
}
