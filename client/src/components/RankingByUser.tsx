import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  GetGroupQuery,
  GetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";

type RankingByUserProps = {
  users: GetGroupQuery["getGroup"]["users"];
  userEcoActions: GetUserEcoActionsByGroupIdQuery["getUserEcoActionsByGroupId"];
  totalMaxPoints: number;
};

const RankingByUser = ({
  users,
  userEcoActions,
  totalMaxPoints,
}: RankingByUserProps) => {
  const sortedUsers = users
    .map((user) => {
      return {
        ...user,
        points: userEcoActions
          ?.filter((ua) => ua.user.id === user.id)
          .reduce((acc, curr) => acc + (curr.points ?? 0), 0),
      };
    })
    .sort((a, b) => {
      if (a.points === b.points) {
        return a.firstName.localeCompare(b.firstName);
      }
      return b.points - a.points;
    });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Participant</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user, idx) => (
            <TableRow
              key={user.id}
              className={`${
                idx === 0
                  ? "bg-green-800 hover:bg-green-800 text-white"
                  : idx === 1
                  ? "bg-green-500 hover:bg-green-500"
                  : "bg-green-200 hover:bg-green-200"
              }`}
            >
              <TableCell>{user.firstName}</TableCell>
              <TableCell className="text-right">
                {`${user.points} / ${totalMaxPoints} points`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RankingByUser;
