import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IUser {
  id: number;
  id_student: number;
  username: string;
  password: string;
  email: string;
}

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_student!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;
}
