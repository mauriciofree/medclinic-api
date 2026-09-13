import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
  ATTENDANT = "ATTENDANT"
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ATTENDANT
  })
  role!: UserRole;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
