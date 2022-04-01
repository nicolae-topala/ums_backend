import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Faculties } from "./Faculties.entity";
import { Study_Fields } from "./Study_Fields.entity";

@Entity()
export class Courses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  category!: string;

  @Column()
  grading_system!: string;

  @ManyToOne(() => Study_Fields, (Study_Fields) => Study_Fields.courses, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  studyField!: Faculties;
}
