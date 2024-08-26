import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserSubscriptionType } from "../entity/User";
import Notification, {
  NotificationInputCreation,
  NotificationInputStatusChange,
  NotificationStatusEnum,
  NotificationTypeEnum,
} from "../entity/Notification";
import { ContextType } from "..";
import Group from "../entity/Group";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export class NotificationResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => Notification)
  async sendNotification(
    @Arg("data")
    { type, receiverId, groupId }: NotificationInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Notification> {
    const receiver = await datasource.getRepository(User).findOne({
      where: { id: receiverId },
    });

    let group;

    if (groupId !== null) {
      group = await datasource.getRepository(Group).findOne({
        where: { id: groupId },
      });
    }

    if (receiver === null) {
      throw new ApolloError("Invalid receiver", "INVALID_RECEIVER");
    }

    const notification = await datasource.getRepository(Notification).save({
      type,
      sender: currentUser,
      receiver,
      ...(group !== null && { group }),
    });

    return notification;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => Notification)
  async changeNotificationStatus(
    @Arg("data")
    { status, notificationId }: NotificationInputStatusChange
  ): Promise<Notification> {
    const notification = await datasource.getRepository(Notification).findOne({
      where: { id: notificationId },
    });

    if (notification === null) {
      throw new ApolloError("Invalid notification", "INVALID_NOTIFICATION");
    }

    notification.status = status;

    await datasource.getRepository(Notification).save(notification);

    return notification;
  }

  @Authorized()
  @Query(() => [Notification])
  async getNotifications(
    @Ctx() { currentUser }: ContextType
  ): Promise<Notification[]> {
    const notifications = await datasource.getRepository(Notification).find({
      where: {
        receiver: { id: currentUser?.id },
        status: NotificationStatusEnum.PENDING,
      },
      relations: {
        receiver: true,
        sender: true,
        group: true,
      },
    });

    return notifications;
  }

  @Authorized()
  @Query(() => [User])
  async getUsersAlreadyAdded(
    @Ctx() { currentUser }: ContextType
  ): Promise<User[]> {
    const notifications = await datasource.getRepository(Notification).find({
      where: {
        sender: { id: currentUser?.id },
        status: NotificationStatusEnum.PENDING,
        type: NotificationTypeEnum.FRIEND_REQUEST,
      },
      relations: {
        receiver: true,
      },
    });

    return notifications.map((notif) => notif.receiver);
  }
}
