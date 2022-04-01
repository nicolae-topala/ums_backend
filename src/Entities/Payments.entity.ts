import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Courses } from "./Courses.entity";
import { Discounts } from "./Discounts.entity";
import { Invoices } from "./Invoices.entity";
import { Students } from "./Students.entity";

@Entity()
export class Payments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float" })
  ammountPaid!: number;

  @Column({ type: "float" })
  penalty!: number;

  @Column()
  status!: string;

  @ManyToOne(() => Discounts, (Discounts: Discounts) => Discounts.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  discount!: Discounts;

  @ManyToOne(() => Invoices, (Invoices: Invoices) => Invoices.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  invoice!: Discounts;

  @ManyToOne(() => Courses, (Courses: Courses) => Courses.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  course!: Courses;

  @ManyToOne(() => Students, (Students: Students) => Students.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  student!: Students;
}
