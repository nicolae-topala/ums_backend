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
  students_firstName: string;
  students_lastName: string;
  students_birthdate: Date;
  students_cnp: string;
  students_firstNameMother: string;
  students_firstNameFather: string;
  students_passport: string;
  students_idCard: string;
  students_sex: string;
  students_citizenship: string;
  students_nationality: string;
  students_countryBirth: string;
  students_cityBirth: string;
  students_countyBirth: string;
  students_countryResidence: string;
  students_cityResidence: string;
  students_countyResidence: string;
  students_religion: string;
  students_minority: boolean;
  students_maritalStatus: string;
  students_militarySituation: boolean;
  students_militaryBooklet: string;
  students_highschoolGraduation: Date;
  students_highschoolBaccalaureate: number;
  students_highschoolOlympic: boolean;
  students_registrationNumber: number;
  students_group: string;
  students_admissionGrade: number;
  students_phone: string;
  students_email: string;
  students_academicYear: string;
  studyfields_name: string;
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
