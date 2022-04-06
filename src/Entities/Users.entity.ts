import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcrypt";

import { Students } from "./Students.entity";

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

  @OneToOne(() => Students, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  student!: Students;

  static async changePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(password, salt);
    password = hash;

    return Users.createQueryBuilder()
      .update(Users)
      .set({ password: password })
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
