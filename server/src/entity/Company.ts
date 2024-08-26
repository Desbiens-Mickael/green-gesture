import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.createdCompany, { onDelete: "CASCADE" })
  creator: User;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
