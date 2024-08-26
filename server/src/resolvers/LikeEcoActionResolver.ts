import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import LikeEcoAction from "../entity/LikeEcoAction";
import { ContextType } from "..";
import datasource from "../db";
import EcoAction from "../entity/EcoAction";
import { UserSubscriptionType } from "../entity/User";
import { ApolloError } from "apollo-server-errors";

@Resolver(LikeEcoAction)
export class LikeEcoActionResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  // Create a like
  @Mutation(() => LikeEcoAction)
  async createLike(
    @Arg("ecoActionId", () => Int) ecoActionId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<LikeEcoAction> {
    const ecoAction = await datasource
      .getRepository(EcoAction)
      .findOne({ where: { id: ecoActionId } });

    if (ecoAction === null) throw new ApolloError("EcoAction not found");

    ecoAction.likes = ecoAction.likes + 1;
    await datasource.getRepository(EcoAction).save(ecoAction);

    return await datasource.getRepository(LikeEcoAction).save({
      user: currentUser,
      ecoAction,
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  // Check if a user has liked an ecoAction
  @Query(() => Boolean)
  async isLiked(
    @Arg("ecoActionId", () => Int) ecoActionId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<Boolean> {
    const like = await datasource.getRepository(LikeEcoAction).findOne({
      where: {
        user: { id: currentUser?.id },
        ecoAction: { id: ecoActionId },
      },
      relations: {
        ecoAction: true,
        user: true,
      },
    });

    if (like === null) return false;

    return true;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  // Get number of likes for an ecoAction
  @Query(() => Number)
  async getNumberLikes(
    @Arg("ecoActionId", () => Int) ecoActionId: number
  ): Promise<Number> {
    const ecoAction = await datasource.getRepository(EcoAction).findOne({
      where: { id: ecoActionId },
    });

    if (ecoAction === null) throw new ApolloError("EcoAction not found");

    return ecoAction.likes;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  // Delete a like
  @Mutation(() => Boolean)
  async deleteLike(
    @Arg("ecoActionId", () => Int) ecoActionId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<Boolean> {
    const ecoAction = await datasource.getRepository(EcoAction).findOne({
      where: { id: ecoActionId },
    });

    if (ecoAction === null) throw new ApolloError("EcoAction not found");

    const like = await datasource.getRepository(LikeEcoAction).findOne({
      where: {
        user: { id: currentUser?.id },
        ecoAction,
      },
    });

    if (like === null) throw new ApolloError("Like not found");

    ecoAction.likes = ecoAction.likes === 0 ? 0 : ecoAction.likes - 1;
    await datasource.getRepository(EcoAction).save(ecoAction);

    await datasource.getRepository(LikeEcoAction).remove(like);

    return true;
  }
}
