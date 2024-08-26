import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import DisplayDate from "@/components/DisplayDate";
import { Badge } from "@/components/ui/badge";
import {
  useGetCommentsForGroupQuery,
  useGetGroupQuery,
  useGetTotalPossiblePointsQuery,
  useGetUserEcoActionsByGroupIdQuery,
} from "@/gql/generated/schema";
import { Loading } from "./Loading";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowChallengeParticipants from "@/components/ShowChallengeParticipants";
import ShowChallengeComments from "@/components/ShowChallengeComments";
import ChallengeEcoActionCard from "@/components/ChallengeEcoActionCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import RankingByTeam from "@/components/RankingByTeam";
import RankingByUser from "@/components/RankingByUser";
import { EcoActionType } from "@/types/global";

const SingleGroup = () => {
  const { id = "0" } = useParams();

  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: parseInt(id || "0", 10) },
  });
  const challenge = challengeData?.getGroup;

  const {
    data: commentData,
    loading: commentLoading,
    refetch: refetchComments,
  } = useGetCommentsForGroupQuery({
    variables: { groupId: challenge?.id || 0 },
  });
  const comments = commentData?.getCommentsForGroup;

  const { data: userEcoActionData, refetch: refetchUserEcoAction } =
    useGetUserEcoActionsByGroupIdQuery({
      variables: { groupId: challenge?.id || 0 },
    });
  const userEcoActions = userEcoActionData?.getUserEcoActionsByGroupId;

  const { loading: currentUserLoading } = useCurrentUser();

  const { data: maxPointsData } = useGetTotalPossiblePointsQuery({
    variables: {
      ecoAactionIds: challenge?.ecoActions.map((eco) => eco.id) ?? [],
    },
  });
  const TotalMaxPoints = maxPointsData?.getTotalPossiblePoints ?? 0;

  if (groupLoading || commentLoading || currentUserLoading) return <Loading />;

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">{challenge?.challengeName}</h1>
      <div className="space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-2 md:gap-8 md:justify-start">
          <p className="text-sm">
            Créé par{" "}
            <span className="font-bold">
              {challenge?.author.firstName} {challenge?.author.lastName}
            </span>
          </p>
          <DisplayDate
            startDate={challenge?.startDate}
            endDate={challenge?.endDate}
          />
        </div>
        <div className="flex justify-between items-center gap-2 md:gap-6 md:justify-start">
          <ShowChallengeParticipants
            component={
              <Badge
                variant="terciary"
                className="px-5 py-3 w-full justify-center"
              >
                {challenge?.users.length ?? 0} participants
              </Badge>
            }
            participants={challenge?.users ?? []}
          />
          <ShowChallengeComments
            component={
              <Badge
                variant="terciary"
                className="px-5 py-3 w-full justify-center md:w-auto"
              >
                {comments?.length} commentaires
              </Badge>
            }
            comments={comments ?? []}
            groupId={Number(id)}
            refetchComments={refetchComments}
          />
        </div>
      </div>
      <div className="mt-7">
        <Tabs defaultValue="defis" className="w-full">
          <TabsList className="w-full bg-transparent p-0">
            <TabsTrigger
              value="defis"
              className="w-full rounded-none text-medium-green font-normal border-b-2 border-b-transparent  data-[state=active]:shadow-none  data-[state=active]:border-b-primary data-[state=active]:bg-zinc-100"
            >
              Défis
            </TabsTrigger>
            <TabsTrigger
              value="classement"
              onClick={() => refetchUserEcoAction()}
              className="w-full rounded-none text-medium-green font-normal border-b-2 border-b-transparent  data-[state=active]:shadow-none  data-[state=active]:border-b-primary data-[state=active]:bg-zinc-100"
            >
              Classement
            </TabsTrigger>
          </TabsList>
          <AnimatePresence>
            <TabsContent key="defis" value="defis">
              <div>
                {challenge?.ecoActions.map((eco) => (
                  <ChallengeEcoActionCard
                    key={eco.id}
                    ecoAction={eco as EcoActionType}
                    challengeEndDate={challenge.endDate}
                    challengeStartDate={challenge.startDate}
                    groupId={challenge.id}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent key="classement" value="classement">
              <motion.div
                key={2}
                initial={{ x: 100 }}
                animate={{ x: 0, transition: { duration: 0.25 } }}
                exit={{ x: -100 }}
              >
                <div>
                  {challenge?.teams.length ? (
                    <RankingByTeam
                      teams={challenge?.teams ?? []}
                      userEcoActions={userEcoActions ?? []}
                      totalMaxPoints={TotalMaxPoints}
                    />
                  ) : (
                    <RankingByUser
                      users={challenge?.users ?? []}
                      userEcoActions={userEcoActions ?? []}
                      totalMaxPoints={TotalMaxPoints}
                    />
                  )}
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
};

export default SingleGroup;
