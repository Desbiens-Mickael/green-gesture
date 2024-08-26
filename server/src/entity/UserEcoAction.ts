import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import EcoAction from "./EcoAction";

import { MinLength } from "class-validator";

@Entity()
@ObjectType()
export class UserEcoAction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.relatedEcoActions, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => EcoAction)
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.userEcoActions, {
    onDelete: "CASCADE",
  })
  ecoAction: EcoAction;

  @Field(() => Int)
  @Column({ default: 0 })
  groupId: number;

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true })
  proof?: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  points?: number;
}

@InputType()
export class UserEcoActionInputAddProof {
  @Field()
  @MinLength(3)
  proof: string;

  @Field()
  userEcoActionId: number;
}

@InputType()
export class UserEcoActionInputAddPoints {
  @Field(() => Int)
  ecoActionId: number;

  @Field(() => Int)
  groupId: number;

  @Field(() => Int)
  points: number;

  @Field({ nullable: true })
  proof?: string;
}
