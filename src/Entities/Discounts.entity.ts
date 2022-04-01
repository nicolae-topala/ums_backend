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

  @Column({ type: "date" })
  date!: Date;

  @Column()
  taxType!: string;

  @Column({ type: "float" })
  discountsAmmount!: number;

  @Column()
  details!: string;

  @Column()
  status!: string;

  @OneToMany(() => Payments, (Payments: Payments) => Payments.discount)
  payments!: Payments[];
}
