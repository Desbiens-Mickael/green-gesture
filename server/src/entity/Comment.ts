import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import User from "./User";
import Group from "./Group";

@Entity()
@ObjectType()
class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @Column()
  message: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user, {
    cascade: true,
  })
  @JoinTable()
  author: User;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group, {
    cascade: true,
  })
  @JoinTable()
  group: Group;
}

@InputType()
export class CommentInputCreation {
  @Field()
  message: string;

  @Field()
  groupId: number;
}

export default Comment;
