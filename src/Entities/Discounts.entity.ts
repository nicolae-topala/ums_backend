import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payments } from "./Payments.entity";

@Entity()
export class Discounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", nullable: true })
  date!: Date;

  @Column({ nullable: true })
  taxType!: string;

  @Column({ type: "float" })
  discountAmmount!: number;

  @Column({ nullable: true })
  details!: string;

  @Column({ nullable: true })
  status!: string;

  @OneToMany(() => Payments, (Payments: Payments) => Payments.discount)
  payments!: Payments[];
}
