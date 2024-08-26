import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import EcoAction from "./EcoAction";

import User from "./User";
import { Team } from "./Team";

@Entity()
@ObjectType()
class Group {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 150 })
  name: string;

  @Field()
  @Column({ length: 255 })
  challengeName: string;

  @Field()
  @Column({ type: "timestamptz" })
  startDate: Date;

  @Field()
  @Column({ type: "timestamptz" })
  endDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdGroups, {
    onDelete: "CASCADE",
  })
  author: User;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  users: User[];

  @Field(() => [EcoAction])
  @ManyToMany(() => EcoAction, (ecoAction) => ecoAction.groups)
  @JoinTable()
  ecoActions: EcoAction[];

  @Field(() => [Team])
  @OneToMany(() => Team, (team) => team.group, {
    onDelete: "CASCADE",
  })
  teams: Team[];
}

@InputType()
export class GroupInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field()
  @MinLength(3)
  @MaxLength(255)
  challengeName: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [Int])
  participants: number[];

  @Field(() => [Int])
  ecoActionsIds: number[];
}

@InputType()
export class GroupInputAddOneUser {
  @Field()
  groupId: number;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class GroupInputAddEcoActions {
  @Field()
  groupId: number;

  @Field(() => [Int])
  ecoActionIds: number[];
}

export default Group;
