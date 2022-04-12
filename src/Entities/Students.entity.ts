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

export interface StudentDocument {
  firstName: string;
  lastName: string;
  birthdate: Date;
  cnp: string;
  firstNameMother: string;
  firstNameFather: string;
  passport: string;
  idCard: string;
  sex: string;
  citizenship: string;
  nationality: string;
  countryBirth: string;
  cityBirth: string;
  countyBirth: string;
  countryResidence: string;
  cityResidence: string;
  countyResidence: string;
  religion: string;
  minority: boolean;
  maritalStatus: string;
  militarySituation: boolean;
  militaryBooklet: string;
  highschoolGraduation: Date;
  highschoolBaccalaureate: number;
  highschoolOlympic: boolean;
  group: string;
  admissionGrade: number;
  phone: string;
  email: string;
  academicYear: string;
  studyField: string;
}

@Entity()
export class Students extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: "date" })
  birthdate!: Date;

  @Column()
  cnp!: string;

  @Column({ nullable: true })
  firstNameMother!: string;

  @Column({ nullable: true })
  firstNameFather!: string;

  @Column({ nullable: true })
  passport!: string;

  @Column({ nullable: true })
  idCard!: string;

  @Column({ nullable: true })
  sex!: string;

  @Column({ nullable: true })
  citizenship!: string;

  @Column({ nullable: true })
  nationality!: string;

  @Column({ nullable: true })
  countryBirth!: string;

  @Column({ nullable: true })
  cityBirth!: string;

  @Column({ nullable: true })
  countyBirth!: string;

  @Column({ nullable: true })
  countryResidence!: string;

  @Column({ nullable: true })
  cityResidence!: string;

  @Column({ nullable: true })
  countyResidence!: string;

  @Column({ nullable: true })
  religion!: string;

  @Column({ nullable: true })
  minority!: boolean;

  @Column({ nullable: true })
  maritalStatus!: string;

  @Column({ nullable: true })
  militarySituation!: boolean;

  @Column({ nullable: true })
  militaryBooklet!: string;

  @Column({ type: "year", nullable: true })
  highschoolGraduation!: Date;

  @Column({ type: "float", nullable: true })
  highschoolBaccalaureate!: number;

  @Column({ nullable: true })
  highschoolOlympic!: boolean;

  @Column({ nullable: true })
  group!: string;

  @Column({ nullable: true })
  registrationNumber!: number;

  @Column({ type: "float", nullable: true })
  admissionGrade!: number;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  academicYear!: string;

  @Column()
  studyFieldId!: number;

  @ManyToOne(
    () => Study_Fields,
    (Study_Fields: Study_Fields) => Study_Fields.students,
    {
      onDelete: "RESTRICT",
      nullable: false,
    }
  )
  @JoinColumn()
  studyField!: Study_Fields;

  @OneToMany(() => Payments, (Payments: Payments) => Payments.student)
  payments!: Payments[];

  @OneToMany(
    () => Student_Courses,
    (Student_Courses: Student_Courses) => Student_Courses.student
  )
  studentCourses!: Student_Courses[];

  static async findStudent(id: number): Promise<StudentDocument> {
    const data = await Students.createQueryBuilder("students")
      .select("students")
      .addSelect("studyfields.name")
      .innerJoin("students.studyField", "studyfields")
      .where("students.id = :id", { id })
      .andWhere("studyfields.id = students.studyFieldId")
      .getRawOne();

    return data;
  }
}
