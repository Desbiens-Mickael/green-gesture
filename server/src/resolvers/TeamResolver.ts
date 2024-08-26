import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateTeamsInput, Team, TeamInputAddUsers } from "../entity/Team";
import datasource from "../db";
import Group from "../entity/Group";
import { ApolloError } from "apollo-server-errors";
import User, { UserSubscriptionType } from "../entity/User";
import { In } from "typeorm";

@Resolver(Team)
export class TeamResolver {
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => [Team])
  async createTeams(
    @Arg("data") { groupId, teams }: CreateTeamsInput
  ): Promise<Team[]> {
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    if (group === null) throw new ApolloError("Group not found", "NOT_FOUND");

    const teamsToSave = await Promise.all(
      teams.map(async (team) => ({
        group,
        name: team.name,
        users: await datasource
          .getRepository(User)
          .find({ where: { id: In(team.userIds) } }),
      }))
    );
    const createdTeams = await datasource.getRepository(Team).save(teamsToSave);

    return createdTeams;
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Query(() => [Team])
  async getTeamByGroup(@Arg("groupId") groupId: number): Promise<Team[]> {
    const teams = await datasource.getRepository(Team).find({
      where: { group: { id: groupId } },
      relations: { users: true, group: true },
    });

    if (teams !== null) {
      return teams;
    }
    throw new Error("Group not found");
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => Team)
  async addUsersToTeam(
    @Arg("data") { teamId, userIds }: TeamInputAddUsers
  ): Promise<Team> {
    const team = await datasource.getRepository(Team).findOne({
      where: { id: teamId },
      relations: { users: true, group: true },
    });

    const users = await datasource
      .getRepository(User)
      .findBy({ id: In(userIds) });

    if (team !== null && users.length > 0) {
      team.users = users;
      return await datasource.getRepository(Team).save(team);
    }
    throw new Error("Team or users not found");
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Query(() => [User])
  async getUsersByTeam(@Arg("teamId") teamId: number): Promise<User[]> {
    const team = await datasource.getRepository(Team).findOne({
      where: { id: teamId },
      relations: { users: true, group: true },
    });
    if (team !== null) {
      return team.users;
    }
    throw new Error("Team not found");
  }
}
