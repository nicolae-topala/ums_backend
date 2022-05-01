import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Users } from "./Users.entity";

export interface SessionsDocument {
  id?: number;
  valid?: boolean;
  userId?: number;
  userAgent?: string;
  createdAt?: Date;
  upatedAt?: Date;
}

@Entity()
export class Sessions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  valid!: boolean;

  @Column({ nullable: true })
  userAgent!: string;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt!: Date;

  @Column()
  userId!: number;

  @ManyToOne(() => Users, (Users: Users) => Users.sessions, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user!: Users;

  static async createSession(userId: number, userAgent: string) {
    const session = (
      await Sessions.createQueryBuilder()
        .insert()
        .values({ userId: userId, userAgent: userAgent })
        .printSql()
        .execute()
    ).identifiers;

    // The query above returns an array of jsons, we take the first one.
    // Because this insert will always return 1 object
    return session[0];
  }

  static async updateSession(id: number, update: SessionsDocument) {
    return await Sessions.createQueryBuilder()
      .update(Sessions)
      .set(update)
      .where("id = :id", { id })
      .execute();
  }

  static async findValid(id: number) {
    return await Sessions.createQueryBuilder()
      .select("valid")
      .where("id = :id", { id })
      .getRawOne();
  }
}
