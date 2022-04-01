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

  @Column({ length: 10, nullable: true })
  officeNumber!: string;

  @Column({ nullable: true })
  hoursWeek!: number;

  @Column({ length: 25, nullable: true })
  type!: string;

  @ManyToOne(() => Courses, (Courses: Courses) => Courses.courseProfessors, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  course!: Courses;

  @ManyToOne(
    () => Professors,
    (Professors: Professors) => Professors.courseProfessors,
    { onDelete: "SET NULL", nullable: true }
  )
  @JoinColumn()
  professor!: Professors;
}
