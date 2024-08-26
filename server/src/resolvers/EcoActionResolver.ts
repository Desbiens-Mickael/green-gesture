import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import datasource from "../db";
import { ContextType } from "..";
import EcoAction, { EcoActionInputCreation } from "../entity/EcoAction";
import { UserSubscriptionType } from "../entity/User";
import { In, IsNull } from "typeorm";
import Validation from "../entity/Validation";
import { ApolloError } from "apollo-server-errors";

@Resolver(EcoAction)
export class EcoActionResolver {
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => EcoAction)
  async createEcoAction(
    @Arg("data")
    { name, description, validationIds }: EcoActionInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction> {
    const validations = await datasource.getRepository(Validation).find({
      where: { id: In(validationIds) },
    });

    if (validations.length !== validationIds.length || validations.length === 0)
      throw new ApolloError("Validation not found", "NOT_FOUND");

    return await datasource.getRepository(EcoAction).save({
      name,
      description,
      author: currentUser,
      validations,
    });
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Query(() => [EcoAction])
  async getUserEcoActions(
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: {
          id: currentUser?.id,
        },
      },
      relations: {
        author: true,
        validations: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [EcoAction])
  async getFreeEcoActions(): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: IsNull(),
      },
      relations: {
        validations: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [EcoAction])
  async getPopularFreeEcoActions(): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: IsNull(),
      },
      order: {
        likes: "DESC",
      },
      take: 5,
      relations: {
        validations: true,
      },
    });
  }

  // Delete an eco-action
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => Boolean)
  async deleteEcoAction(
    @Arg("id", () => Int) id: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<Boolean> {
    const ecoAction = await datasource
      .getRepository(EcoAction)
      .findOne({ where: { id, author: { id: currentUser?.id } } });

    if (ecoAction === null)
      throw new ApolloError("EcoAction not found", "NOT_FOUND");

    await datasource.getRepository(EcoAction).remove(ecoAction);

    return true;
  }

  // Get an eco-action by id
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Query(() => EcoAction)
  async getEcoActionbyId(
    @Arg("id", () => Int) id: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction> {
    const ecoAction = await datasource.getRepository(EcoAction).findOne({
      where: { id },
      relations: { validations: true, author: true },
    });

    if (ecoAction === null)
      throw new ApolloError("EcoAction introuvable", "NOT_FOUND");

    if (
      (ecoAction.author === null && currentUser?.role !== "admin") ||
      (ecoAction.author !== null && ecoAction.author?.id !== currentUser?.id)
    )
      throw new ApolloError("Accès refusé", "ACCESS_DENIED");

    return ecoAction;
  }

  // Update an eco-action
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => EcoAction)
  async updateEcoAction(
    @Arg("id", () => Int) id: number,
    @Arg("data") { name, description, validationIds }: EcoActionInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction> {
    const ecoAction = await datasource
      .getRepository(EcoAction)
      .findOne({ where: { id, author: { id: currentUser?.id } } });

    if (ecoAction === null)
      throw new ApolloError("EcoAction not found", "NOT_FOUND");

    const validations = await datasource.getRepository(Validation).find({
      where: { id: In(validationIds) },
    });

    if (validations.length !== validationIds.length)
      throw new ApolloError("Validation not found", "NOT_FOUND");

    return await datasource.getRepository(EcoAction).save({
      ...ecoAction,
      name,
      description,
      validations,
    });
  }
}
