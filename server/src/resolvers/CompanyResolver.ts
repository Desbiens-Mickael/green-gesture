import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import { In } from "typeorm";

import { Company } from "../entity/Company";
import datasource from "../db";
import User, { UserSubscriptionType } from "../entity/User";
import { ContextType } from "..";

@Resolver(Company)
export class CompanyResolver {
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => Company)
  async addUsersToCompany(
    @Arg("companyId", () => Int) id: number,
    @Arg("users", () => [Int]) users: number[],
    @Ctx() { currentUser }: ContextType
  ): Promise<Company> {
    const company = await datasource.getRepository(Company).findOne({
      where: { id, creator: { id: currentUser?.id } },
      relations: { users: true, creator: true },
    });

    if (company === null)
      throw new ApolloError("company not found", "NOT_FOUND");

    const usersToAdd = await datasource.getRepository(User).find({
      where: { id: In(users) },
    });

    const usersToAddFiltered = usersToAdd.filter((user) => {
      return (
        company.users.filter((companyUser) => companyUser.id === user.id)
          .length === 0
      );
    });

    company.users = [...company.users, ...usersToAddFiltered];

    return await datasource.getRepository(Company).save(company);
  }
}
