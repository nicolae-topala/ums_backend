import { Faculties } from "../src/Entities/Faculties.entity";
import { Students } from "../src/Entities/Students.entity";
import { Users } from "../src/Entities/Users.entity";

export default {
  database: "ums_db",
  username: "root",
  password: "123321",
  logging: true,
  synchronize: false,
  entities: [Users, Students, Faculties],
};
