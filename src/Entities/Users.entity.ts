import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import config from "config";

import { Sessions } from "./Sessions.entity";
import { Students } from "./Students.entity";

export interface UsersDocument {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  status?: string;
  token?: string;
  createdAt?: Date;
  studentId?: number;
}
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  token!: string;

  @Column({ type: "timestamp", nullable: true })
  createdAt!: Date;

  @Column()
  studentId!: number;

  @OneToOne(() => Students, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  student!: Students;

  @OneToMany(() => Sessions, (Sessions: Sessions) => Sessions.user)
  sessions!: Sessions[];

  static async changePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(password, salt);
    password = hash;

    return await Users.createQueryBuilder()
      .update(Users)
      .set({ password: password })
      .where("id = :id", { id })
      .execute();
  }

  static async comparePassword(id: number, password: string): Promise<boolean> {
    const checkPassword = await Users.createQueryBuilder()
      .select(["password"])
      .where("id = :id", { id })
      .getRawOne();

    return await bcrypt
      .compare(password, checkPassword["password"])
      .catch((e) => false);
  }

  static async changeEmail(id: number, email: string) {
    return await Users.createQueryBuilder()
      .update(Users)
      .set({ email: email })
      .where("id = :id", { id })
      .execute();
  }

  static async createToken(id: number, token: string) {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(token, salt);

    return await Users.createQueryBuilder()
      .update(Users)
      .set({ token: hash, createdAt: new Date().toISOString() })
      .where("id = :id", { id })
      .execute();
  }

  static async setNullToken(id: number) {
    return await Users.createQueryBuilder()
      .update(Users)
      .set({ token: undefined })
      .where("id = :id", { id })
      .execute();
  }
}
