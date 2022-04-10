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
      .where("id = :id", { id: id })
      .execute();
  }

  static async changeEmail(id: number, email: string) {
    return await Users.createQueryBuilder()
      .update(Users)
      .set({ email: email })
      .where("id = :id", { id: id })
      .execute();
  }

  static async comparePassword(id: number, password: string): Promise<boolean> {
    const checkPassword = await Users.createQueryBuilder()
      .select(["password"])
      .where("id = :id", { id: id })
      .getRawOne();

    return await bcrypt
      .compare(password, checkPassword["password"])
      .catch((e) => false);
  }
}
