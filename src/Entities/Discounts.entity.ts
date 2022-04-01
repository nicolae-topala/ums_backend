import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payments } from "./Payments.entity";

@Entity()
export class Discounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  taxType!: string;

  @Column()
  discountsAmmount!: number;

  @Column()
  details!: string;

  @Column()
  status!: string;

  @OneToMany(() => Payments, (Payments) => Payments.discount)
  payments!: Payments[];
}
