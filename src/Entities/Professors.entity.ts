import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Faculties } from "./Faculties.entity";

@Entity()
export class Professors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  LastName!: string;

  @Column()
  birthdate!: Date;

  @Column()
  cnp!: string;

  @Column()
  email!: string;

  @ManyToOne(() => Faculties, (Faculties) => Faculties.professors, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  faculty!: Faculties;
}
