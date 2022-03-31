import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Faculties } from "./Faculties.entity";
import { Students } from "./Students.entity";

@Entity()
export class Study_Fields extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column()
  type!: string;

  @Column()
  ects!: number;

  @Column()
  yearsNumber!: string;

  @Column()
  semestersNumber!: string;

  @ManyToOne(() => Faculties, (Faculties) => Faculties.studyFields, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  faculty!: Faculties;

  @OneToMany(() => Students, (Students) => Students.studyField)
  students!: Students[];
}
