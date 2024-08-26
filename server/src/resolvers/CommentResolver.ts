import { ApolloError } from "apollo-server-errors";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Comment, { CommentInputCreation } from "../entity/Comment";
import User, { UserSubscriptionType } from "../entity/User";
import datasource from "../db";
import { ContextType } from "..";
import Group from "../entity/Group";

@Resolver(Comment)
export class CommentResolver {
  // Mutation to create a comment
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => Comment)
  async createComment(
    @Arg("data") { message, groupId }: CommentInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Comment> {
    // fetch group
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    if (group === null)
      throw new ApolloError(`Group not found with id: ${groupId}`, "NOT_FOUND");

    const newComment = await datasource.getRepository(Comment).save({
      message,
      author: currentUser as User,
      group,
      createdAt: new Date(),
    });

    return newComment;
  }

  // Query to get all comments for a group
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [Comment])
  async getCommentsForGroup(
    @Arg("groupId") groupId: number
  ): Promise<Comment[]> {
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    if (group === null)
      throw new ApolloError(`Group not found with id: ${groupId}`, "NOT_FOUND");

    const comments = await datasource.getRepository(Comment).find({
      where: {
        group: { id: group.id },
      },
      relations: {
        author: true,
      },
    });

    return comments;
  }
}
