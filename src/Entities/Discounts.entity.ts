import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
