import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Courses } from "./Courses.entity";
import { Professors } from "./Professors.entity";

@Entity()
export class Course_Professors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  officeNumber!: string;

  @ManyToOne(() => Courses, (Courses) => Courses.courseProfessors)
  course!: Courses;

  @ManyToOne(() => Professors, (Professors) => Professors.courseProfessors)
  professor!: Professors;
}
