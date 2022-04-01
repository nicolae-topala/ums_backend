import { Courses } from "../src/Entities/Courses.entity";
import { Course_Professors } from "../src/Entities/Course_Professors.entity";
import { Discounts } from "../src/Entities/Discounts.entity";
import { Faculties } from "../src/Entities/Faculties.entity";
import { Invoices } from "../src/Entities/Invoices.entity";
import { Payments } from "../src/Entities/Payments.entity";
import { Professors } from "../src/Entities/Professors.entity";
import { Students } from "../src/Entities/Students.entity";
import { Student_Courses } from "../src/Entities/Student_Courses.entity";
import { Study_Fields } from "../src/Entities/Study_Fields.entity";
import { Users } from "../src/Entities/Users.entity";

export default {
  database: "ums_db_test",
  username: "root",
  password: "123321",
  logging: true,
  synchronize: true,
  entities: [
    Users,
    Students,
    Faculties,
    Study_Fields,
    Professors,
    Discounts,
    Invoices,
    Courses,
    Payments,
    Student_Courses,
    Course_Professors,
  ],
};
