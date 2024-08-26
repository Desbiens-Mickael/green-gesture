import {
  useGetMaxValidationPointsQuery,
  useGetUserEcoActionQuery,
  // useGetValidationQuery,
} from "@/gql/generated/schema";
import { motion } from "framer-motion";
import { Loading } from "@/pages/Loading";
import EcoActionDetailsCard from "./EcoActionDetailsCard";
import Validation from "./Validation";
import ValidationDetails from "./ValidationDetails";
import { EcoActionType } from "@/types/global";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

interface ChallengeEcoActionCardProps {
  ecoAction: EcoActionType;
  challengeEndDate: number;
  challengeStartDate: number;
  groupId: number;
}

const ChallengeEcoActionCard = ({
  ecoAction,
  challengeEndDate,
  challengeStartDate,
  groupId,
}: ChallengeEcoActionCardProps) => {
  const { data, loading, refetch } = useGetUserEcoActionQuery({
    variables: { groupId, ecoActionId: ecoAction.id },
  });
  const userEcoAction = data?.getUserEcoAction;

  const { data: maxPointsData, loading: maxPointsLoading } =
    useGetMaxValidationPointsQuery({
      variables: { ecoActionId: ecoAction.id },
    });
  const maxPoints = maxPointsData?.getMaxValidationPoints;

  if (loading) return <Loading />;

  return (
    <motion.div
      key={ecoAction.id}
      initial={{ x: -100 }}
      animate={{ x: 0, transition: { duration: 0.2 } }}
      exit={{ x: 100 }}
      className="h-full"
    >
      <div className="w-[100%] rounded-xl bg-grey-green my-5 px-3 pb-4 pt-2 hover:shadow-2xl transition ease-in-out delay-90">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-1">
            <h3 className="font-sans">{ecoAction.name}</h3>
            <EcoActionDetailsCard
              ecoAction={ecoAction}
              trigger={
                <Button type="button" variant="ghost" className="p-1 h-auto">
                  <Eye size="24" />
                </Button>
              }
            />
          </div>
          <span className="font-semibold text-sm">
            {userEcoAction !== null &&
              userEcoAction !== undefined &&
              `${userEcoAction?.points} / ${maxPoints?.points}`}{" "}
            {userEcoAction?.points ? "points" : "0 points"}
          </span>
        </div>
        <p className="font-sans text-2xs mt-2 mb-4 md:max-w-lg">
          {`${ecoAction.description.slice(0, 250)}...`}
        </p>
        <div className="flex justify-end items-center">
          {/* VALIDER */}
          {userEcoAction === undefined &&
            new Date(challengeEndDate).getTime() > new Date().getTime() &&
            new Date(challengeStartDate).getTime() < new Date().getTime() && (
              <Validation
                ecoActionId={ecoAction.id}
                groupId={groupId}
                refetchParent={refetch}
              />
            )}
          {/* MA VALIDATION */}
          {userEcoAction !== undefined && (
            <ValidationDetails groupId={groupId} ecoActionId={ecoAction.id} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeEcoActionCard;
