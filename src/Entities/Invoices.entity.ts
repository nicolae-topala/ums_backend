import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payments } from "./Payments.entity";

@Entity()
export class Invoices extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  series!: string;

  @Column()
  number!: string;

  @Column()
  date!: Date;

  @Column()
  type!: string;

  @Column()
  currencyType!: string;

  @Column()
  ammount!: number;

  @OneToOne(() => Payments, (Payments: Payments) => Payments.invoice)
  payments!: Payments;
}
