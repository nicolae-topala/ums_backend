export default {
  database: "ums_db_test",
  host: "localhost",
  port: "3306",
  username: "root",
  password: "123321",
  logging: true,
  synchronize: false,
  entities: ["src/Entities/**/*.ts"],
  migrations: ["src/Migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/Entities",
    migrationsDir: "src/Migrations",
  },
};
