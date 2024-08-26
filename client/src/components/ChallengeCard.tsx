import { Link } from "react-router-dom";
import DisplayDate from "./DisplayDate";
import { GroupType } from "@/types/global";

interface ChallengeCardProps {
  group: GroupType;
}

function ChallengeCard({ group }: ChallengeCardProps) {
  return (
    <Link
      key={group.id}
      to={`/groups/${group.id}`}
      className="flex flex-col justify-between bg-card rounded-xl h-[125px] min-w-[150px] cursor-pointer p-2 elevate-box border-2 border-transparent hover:border-primary"
    >
      <div>
        <h4 className="text-xs font-semibold">{group.challengeName}</h4>
        <DisplayDate
          startDate={group.startDate}
          endDate={group.endDate}
          size="2xs"
        />
      </div>
    </Link>
  );
}

export default ChallengeCard;
