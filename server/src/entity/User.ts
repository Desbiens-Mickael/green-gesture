import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Options, argon2id, hash, verify } from "argon2";
import Group from "./Group";
import EcoAction from "./EcoAction";
import { Team } from "./Team";
import { Company } from "./Company";
import { UserEcoAction } from "./UserEcoAction";
import LikeEcoAction from "./LikeEcoAction";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export enum UserSubscriptionType {
  FREE = "free",
  PARTNER = "partner",
}

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 150 })
  firstName: string;

  @Field()
  @Column({ length: 150 })
  lastName: string;

  @Field()
  @Column({ length: 200, unique: true })
  email: string;

  @Field()
  @Column({ length: 255 })
  password: string;

  @Field()
  @Column({ default: UserRole.USER, enum: UserRole })
  role: string;

  @Field()
  @Column({ default: UserSubscriptionType.FREE, enum: UserSubscriptionType })
  subscriptionType: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  subscriptionId?: string;

  @Field(() => Company, { nullable: true })
  @ManyToOne(() => Company, (company) => company.users, { cascade: true })
  company?: Company;

  @Field(() => Company, { nullable: true })
  @OneToOne(() => Company, { cascade: true })
  @JoinColumn()
  createdCompany?: Company;

  @Field(() => [Group])
  @OneToMany(() => Group, (group) => group.author, {
    cascade: true,
  })
  createdGroups?: Group[];

  @Field(() => [Group], { nullable: true })
  @ManyToMany(() => Group, (group) => group.users, {
    cascade: true,
  })
  groups?: Group[];

  @Field(() => [EcoAction])
  @OneToMany(() => EcoAction, (ecoAction) => ecoAction.author, {
    cascade: true,
  })
  createdEcoActions?: EcoAction[];

  @Field(() => [UserEcoAction])
  @OneToMany(() => UserEcoAction, (userEcoAction) => userEcoAction.user, {
    cascade: true,
  })
  relatedEcoActions?: UserEcoAction[];

  @Field(() => Team, { nullable: true })
  @ManyToMany(() => Team, (team) => team.users, {
    cascade: true,
  })
  teams?: Team[];

  // Association réflexives
  @Field(() => [User], { defaultValue: [] })
  @ManyToMany(() => User, (user) => user.friends, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  friends: User[];

  @Field(() => [LikeEcoAction])
  @OneToMany(() => LikeEcoAction, (like) => like.user, {
    cascade: true,
  })
  likes?: LikeEcoAction[];
}

@InputType()
export class UserInputSubscribe {
  @Field()
  @MaxLength(150)
  firstName: string;

  @Field()
  @MaxLength(150)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field({ nullable: true, defaultValue: null })
  @MinLength(2)
  company?: string;

  @Field({ nullable: true, defaultValue: UserRole.USER })
  role?: string;

  @Field({ nullable: true, defaultValue: UserSubscriptionType.FREE })
  subscriptionType?: string;

  @Field({ nullable: true, defaultValue: null })
  subscriptionId?: string;
}

@InputType()
export class UserInputLogin {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

const hashOptions: Options & { raw?: false } = {
  type: argon2id,
  memoryCost: 2 ** 16,
};

export const hashPassword = async (plain: string): Promise<string> => {
  const hashedPassword = await hash(plain, hashOptions);

  return hashedPassword;
};

export const verifyPassword = async (
  hashPassword: string,
  plain: string
): Promise<boolean> => {
  return await verify(hashPassword, plain);
};

export default User;
