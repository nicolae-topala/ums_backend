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

  @Column({ nullable: true })
  status!: string;

  @Column()
  studentId!: number;
  @ManyToOne(() => Students, (Students: Students) => Students.payments, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  student!: Students;

  @Column()
  discountId!: number;
  @ManyToOne(() => Discounts, (Discounts: Discounts) => Discounts.payments, {
    onDelete: "NO ACTION",
    nullable: true,
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

  static async getPayments(id: number) {
    return await Payments.createQueryBuilder("payments")
      .select("payments")
      .addSelect("invoices")
      .addSelect("courses.name")
      .innerJoin("payments.student", "students")
      .innerJoin("payments.invoice", "invoices")
      .innerJoin("payments.course", "courses")
      .where("students.id = :id", { id })
      .getRawMany();
  }
}
