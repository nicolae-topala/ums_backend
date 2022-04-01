import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Courses } from "./Courses.entity";
import { Professors } from "./Professors.entity";

@Entity()
export class Course_Professors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  officeNumber!: string;

  @ManyToOne(() => Courses, (Courses: Courses) => Courses.courseProfessors, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  course!: Courses;

  @ManyToOne(
    () => Professors,
    (Professors: Professors) => Professors.courseProfessors,
    { onDelete: "SET NULL" }
  )
  @JoinColumn()
  professor!: Professors;
}
