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

export enum NotificationStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum NotificationTypeEnum {
  CHALLENGE_REQUEST = "challenge_request",
  FRIEND_REQUEST = "friend_request",
}

@Entity()
@ObjectType()
class Notification {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    default: NotificationStatusEnum.PENDING,
    enum: NotificationStatusEnum,
  })
  status: string;

  @Field()
  @Column({ enum: NotificationTypeEnum })
  type: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user, {
    cascade: true,
  })
  @JoinTable()
  sender: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user, {
    cascade: true,
  })
  @JoinTable()
  receiver: User;

  @Field(() => Group, { nullable: true })
  @ManyToOne(() => Group, (group) => group, {
    cascade: true,
  })
  @JoinTable()
  group?: Group;
}

@InputType()
export class NotificationInputCreation {
  @Field()
  type: string;

  @Field()
  receiverId: number;

  @Field({ nullable: true })
  groupId?: number;
}

@InputType()
export class NotificationInputStatusChange {
  @Field()
  status: string;

  @Field()
  notificationId: number;
}

export default Notification;
