import { Users } from "../src/Models/Users";

export default {
  database: "ums_db",
  username: "root",
  password: "123321",
  logging: true,
  synchronize: false,
  entities: [Users],
};
