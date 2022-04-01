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

  @Column({ type: "float", nullable: true })
  penalty!: number;

  @Column({ nullable: true })
  status!: string;

  @ManyToOne(() => Discounts, (Discounts: Discounts) => Discounts.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  discount!: Discounts;

  @ManyToOne(() => Invoices, (Invoices: Invoices) => Invoices.payments, {
    onDelete: "RESTRICT",
    nullable: false,
  })
  @JoinColumn()
  invoice!: Invoices;

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
