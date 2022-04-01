import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Students } from "./Students.entity";

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
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

  @OneToOne(() => Students, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  student!: Students;
}
