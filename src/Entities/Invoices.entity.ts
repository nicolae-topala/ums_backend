import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @Column({ type: "date" })
  date!: Date;

  @Column()
  type!: string;

  @Column({ length: 10 })
  currencyType!: string;

  @Column({ type: "float" })
  ammount!: number;

  @OneToMany(() => Payments, (Payments: Payments) => Payments.invoice)
  payments!: Payments[];
}
