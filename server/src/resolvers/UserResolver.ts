import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";

import User, {
  hashPassword,
  UserInputLogin,
  UserInputSubscribe,
  UserRole,
  UserSubscriptionType,
  verifyPassword,
} from "../entity/User";

import datasource from "../db";
import { env } from "../env";
import { ContextType } from "..";
import { Company } from "../entity/Company";

@Resolver(User)
export class UserResolver {
  @Authorized<UserRole>([UserRole.ADMIN])
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find({
      relations: {
        createdGroups: true,
        groups: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [User])
  async getUsers(@Ctx() { currentUser }: ContextType): Promise<User[]> {
    const user = currentUser as User;

    return await datasource.getRepository(User).find({
      where: { id: Not(user.id) },
    });
  }

  @Query(() => User)
  async getUserById(@Arg("id", () => Int) id: number): Promise<User> {
    const user = await datasource.getRepository(User).findOne({
      where: { id },
      relations: { friends: true, company: true, createdCompany: true },
    });

    if (user === null) throw new ApolloError("user not found", "NOT_FOUND");

    return user;
  }

  @Query(() => Boolean)
  async isEmailAlreadyUsed(
    @Arg("email", () => String) email: string
  ): Promise<boolean> {
    const user = await datasource.getRepository(User).findOne({
      where: { email },
    });

    return user !== null;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [User])
  async getUsersByName(
    @Ctx() { currentUser }: { currentUser: User },
    @Arg("name", () => String) name: string
  ): Promise<User[]> {
    if (name.length < 1) return [];

    const foundUsers = await datasource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("lower(user.firstName) LIKE lower(:searchTerm)", {
        searchTerm: `%${name}%`,
      })
      .orWhere("lower(user.lastName) LIKE lower(:searchTerm)", {
        searchTerm: `%${name}%`,
      })
      .getMany();

    const currentFriends = currentUser.friends.map((friend) => friend.id);

    const searchedUsers = foundUsers.filter(
      (foundUser) =>
        !currentFriends.includes(foundUser.id) &&
        foundUser.id !== currentUser.id
    );

    return searchedUsers;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data")
    {
      firstName,
      lastName,
      email,
      password,
      company,
      role,
      subscriptionType,
      subscriptionId,
    }: UserInputSubscribe,
    @Ctx() { res }: ContextType
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const createdUser = await datasource.getRepository(User).save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      subscriptionType,
      subscriptionId,
    });

    if (company !== null && subscriptionType === UserSubscriptionType.PARTNER) {
      const newCompany = await datasource.getRepository(Company).save({
        name: company,
        creator: createdUser,
        users: [createdUser],
      });

      createdUser.createdCompany = newCompany;
      createdUser.company = newCompany;

      const createdPartnerUser = await datasource
        .getRepository(User)
        .save(createdUser);

      const token = jwt.sign(
        { userId: createdPartnerUser.id },
        env.JWT_PRIVATE_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
      });

      return createdPartnerUser;
    }

    const token = jwt.sign({ userId: createdUser.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return createdUser;
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInputLogin,
    @Ctx() { res }: ContextType
  ): Promise<String> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(user.password, password)))
      throw new ApolloError("Invalid credentials", "INVALID_CREDS");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() { res }: ContextType): Promise<String> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return "Successfully logged out";
  }

  @Authorized()
  @Query(() => User)
  async getCurrentUser(@Ctx() { currentUser }: ContextType): Promise<User> {
    return currentUser as User;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => User)
  async addFriend(
    @Arg("friendId", () => Int) friendId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    const friend = await datasource
      .getRepository(User)
      .findOne({ where: { id: friendId }, relations: { friends: true } });

    if (friend === null) throw new ApolloError("friend not found", "NOT_FOUND");

    // const user = currentUser as User;
    const user = currentUser as User;

    const alreadyIn = user.friends?.findIndex((f) => f.id === friend.id) > -1;
    if (alreadyIn) {
      throw new ApolloError("friend already added", "ALREADY_ADDED");
    }

    user.friends?.push(friend);

    friend.friends?.push(user);

    await datasource.getRepository(User).save(user);
    await datasource.getRepository(User).save(friend);

    return user;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => String)
  async removeFriend(
    @Arg("friendId", () => Int) friendId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<String> {
    const friend = await datasource
      .getRepository(User)
      .findOne({ where: { id: friendId }, relations: { friends: true } });

    if (friend === null) throw new ApolloError("friend not found", "NOT_FOUND");

    const user = currentUser as User;

    const friendIndex = user.friends?.findIndex((f) => f.id === friend.id);
    if (friendIndex === undefined || friendIndex < 0) {
      throw new ApolloError("friend not found", "NOT_FOUND");
    }

    user.friends = user.friends?.filter((f) => f.id !== friend.id);
    friend.friends = friend.friends?.filter((f) => f.id !== user.id);

    await datasource.getRepository(User).save(user);
    await datasource.getRepository(User).save(friend);

    return "Successfully removed friend";
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => Boolean)
  async unsubscribe(@Ctx() { currentUser }: ContextType): Promise<Boolean> {
    const user = await datasource.getRepository(User).findOne({
      where: { id: currentUser?.id },
      relations: { company: true },
    });

    if (user === null) throw new ApolloError("user not found", "NOT_FOUND");

    const currentCompany = currentUser?.company as Company;

    if (currentCompany.id !== user.company?.id) {
      throw new ApolloError("user not in your company", "NOT_IN_COMPANY");
    }

    user.subscriptionType = UserSubscriptionType.FREE;
    user.subscriptionId = "";
    await datasource.getRepository(User).save(user);

    return true;
  }
}
