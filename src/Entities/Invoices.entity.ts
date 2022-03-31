import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
