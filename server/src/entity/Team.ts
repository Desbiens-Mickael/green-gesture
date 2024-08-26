import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
import { MaxLength, MinLength } from "class-validator";
import User from "./User";

@Entity()
@ObjectType()
export class Team {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.teams, {
    onDelete: "CASCADE",
  })
  group: Group;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.teams, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  users: User[];
}

@InputType()
export class CreateTeamInput {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field(() => [Int])
  userIds: number[];
}

// InputType for creating multiple teams at once with users in them
@InputType()
export class CreateTeamsInput {
  @Field(() => Int)
  groupId: number;

  @Field(() => [CreateTeamInput])
  teams: CreateTeamInput[];
}

@InputType()
export class TeamInputAddUsers {
  @Field(() => Int)
  teamId: number;

  @Field(() => [Int])
  userIds: number[];
}
