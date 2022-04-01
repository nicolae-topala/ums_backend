import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @Column()
  ammountPaid!: number;

  @Column()
  penalty!: number;

  @Column()
  status!: string;

  @ManyToOne(() => Discounts, (Discounts) => Discounts.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  discount!: Discounts;

  @OneToOne(() => Invoices, (Invoices) => Invoices.payments, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  invoice!: Discounts;

  @ManyToOne(() => Courses, (Courses) => Courses.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  course!: Courses;

  @ManyToOne(() => Students, (Students) => Students.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  student!: Students;
}
