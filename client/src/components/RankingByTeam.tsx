import {
  GetGroupQuery,
  GetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import RankingByUser from "./RankingByUser";

type RankingByTeamProps = {
  teams: GetGroupQuery["getGroup"]["teams"];
  userEcoActions: GetUserEcoActionsByGroupIdQuery["getUserEcoActionsByGroupId"];
  totalMaxPoints: number;
};

const RankingByTeam = ({
  teams,
  userEcoActions,
  totalMaxPoints,
}: RankingByTeamProps) => {
  const sortedTeams = teams
    .map((team) => {
      return {
        ...team,
        points: team.users
          ?.map((user) =>
            userEcoActions
              ?.filter((ua) => ua.user.id === user.id)
              .reduce((acc, curr) => acc + (curr.points ?? 0), 0)
          )
          .reduce((acc, curr) => (acc ?? 0) + (curr ?? 0), 0),
      };
    })
    .sort((a, b) => {
      if (a.points === b.points) {
        return a.name.localeCompare(b.name);
      }
      return (b.points || 0) - (a.points || 0);
    });

  return (
    <>
      {sortedTeams.map((team) => {
        return (
          <NavigationMenu className=" w-full" key={team.id}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-full">
                  <div className="w-full flex justify-between pt-5">
                    {team.name}{" "}
                    <p className="text-[.9rem] font-bold">
                      {`${team.points} points`}
                    </p>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="text-xs">
                  <RankingByUser
                    users={team?.users ?? []}
                    userEcoActions={userEcoActions}
                    totalMaxPoints={totalMaxPoints}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        );
      })}
    </>
  );
};

export default RankingByTeam;
