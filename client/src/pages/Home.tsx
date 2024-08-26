import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  useGetFreeEcoActionsQuery,
  useGetPopularFreeEcoActionsQuery,
  useGetUserGroupsQuery,
} from "../gql/generated/schema";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ChallengeCard from "@/components/ChallengeCard";
import { GroupType } from "@/types/global";
import EcoActionCard from "@/components/EcoActionCard";

function Home() {
  const { currentUser } = useCurrentUser();

  const { data: userGroups, refetch } = useGetUserGroupsQuery();
  const groups = userGroups?.getUserGroups || [];

  const { data: dataFreeEcoActions } = useGetFreeEcoActionsQuery();
  const freeEcoActions = dataFreeEcoActions?.getFreeEcoActions || [];

  const { data: dataMostLikedEcoActions } = useGetPopularFreeEcoActionsQuery();

  const mostLikedEcoActions =
    dataMostLikedEcoActions?.getPopularFreeEcoActions || [];

  useEffect(() => {
    refetch();
  }, []);

  const challengeInProgress = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now >= startDate && now <= endDate;
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Bienvenue, {currentUser?.firstName} {currentUser?.lastName} ! 👋
      </h1>
      <div className="space-y-8">
        {challengeInProgress.length > 0 ? (
          <div>
            <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
              <h2 className="font-semibold">Mes challenges en cours</h2>
              <Link to="/groups" className="text-xs underline">
                Voir tous
              </Link>
            </div>
            <div className="flex overflow-scroll snap-mandatory gap-3 no-scrollbar">
              {challengeInProgress.map((group) => (
                <ChallengeCard key={group.id} group={group as GroupType} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center bg-zinc-200 border-2 border-dashed rounded-lg p-3 h-32 md:max-w-max">
            <Button asChild={true} variant="secondary" className="md:max-w-max">
              <Link to="/create-group">
                Créer {groups.length > 0 ? "un" : "mon premier"} challenge
              </Link>
            </Button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
            <h2 className="font-semibold">Nouveaux éco-gestes</h2>
            <Link to="/eco-actions" className="text-xs underline">
              Voir tous
            </Link>
          </div>

          <div className="space-y-3 md:space-y-0 md:flex md:overflow-scroll md:snap-mandatory md:gap-3 no-scrollbar">
            {freeEcoActions?.slice(0, 3).map((ecoAction) => (
              <EcoActionCard key={ecoAction.id} ecoAction={ecoAction} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between md:justify-start md:gap-3 mb-3">
            <h2 className="font-semibold">Éco-gestes populaires</h2>
            <Link to="/eco-actions" className="text-xs underline">
              Voir tous
            </Link>
          </div>
          <div className="space-y-3 md:space-y-0 md:flex md:overflow-scroll md:snap-mandatory md:gap-3 no-scrollbar">
            {mostLikedEcoActions.length > 0 &&
              mostLikedEcoActions
                .slice(0, 3)
                .map((ecoAction) => (
                  <EcoActionCard key={ecoAction.id} ecoAction={ecoAction} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
