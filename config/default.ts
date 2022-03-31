import { Discounts } from "../src/Entities/Discounts.entity";
import { Faculties } from "../src/Entities/Faculties.entity";
import { Invoices } from "../src/Entities/Invoices.entity";
import { Professors } from "../src/Entities/Professors.entity";
import { Students } from "../src/Entities/Students.entity";
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
  ],
};
