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
import Group from "./Group";
import User from "./User";
import Validation from "./Validation";
import { UserEcoAction } from "./UserEcoAction";
import LikeEcoAction from "./LikeEcoAction";

@Entity()
@ObjectType()
class EcoAction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.createdEcoActions, {
    onDelete: "CASCADE",
  })
  author?: User;

  @Field(() => Number)
  @Column({ default: 0 })
  likes: number;

  @Field(() => [Group], { nullable: true })
  @ManyToMany(() => Group, (group) => group.ecoActions, {
    onDelete: "CASCADE",
  })
  groups?: Group[];

  @Field(() => [Validation])
  @ManyToMany(() => Validation, (validation) => validation.ecoAction, {
    cascade: true,
  })
  @JoinTable({ name: "ecoAction_validations" })
  validations: Validation[];

  @Field(() => [UserEcoAction])
  @OneToMany(() => UserEcoAction, (userEcoAction) => userEcoAction.ecoAction, {
    cascade: true,
  })
  userEcoActions: UserEcoAction[];

  @Field(() => [LikeEcoAction])
  @OneToMany(() => LikeEcoAction, (like) => like.ecoAction, {
    cascade: true,
  })
  likesList: LikeEcoAction[];
}

@InputType()
export class EcoActionInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field()
  @MinLength(3)
  description: string;

  @Field(() => [Int])
  validationIds: number[];
}

export default EcoAction;
