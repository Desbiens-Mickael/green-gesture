import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { useGetUserGroupsQuery } from "@/gql/generated/schema";
import { GroupType } from "@/types/global";
import { Link } from "react-router-dom";

function Groups() {
  const { data: userGroups } = useGetUserGroupsQuery();
  const groups = userGroups?.getUserGroups || [];

  // challenge en cours
  const challengeInProgress = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now >= startDate && now <= endDate;
  });

  // challenge à venir
  const challengeToCome = groups.filter((chall) => {
    const now = new Date().getTime();
    const startDate = new Date(chall.startDate).getTime();
    return now < startDate;
  });

  // challenge terminé
  const challengeFinished = groups.filter((chall) => {
    const now = new Date().getTime();
    const endDate = new Date(chall.endDate).getTime();
    return now > endDate;
  });

  const noChallengeYet = groups.length === 0;

  return (
    <div className="py-4">
      {noChallengeYet ? (
        <div className="text-center space-y-2">
          <h2>Pas encore de challenges...</h2>
          <Button asChild={true} variant="secondary">
            <Link to="/create-group">Créer mon premier challenge</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* CHALLENGES EN COURS */}
          {challengeInProgress.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Mes challenges en cours</h2>
              <div className="flex overflow-scroll snap-mandatory gap-3 no-scrollbar">
                {challengeInProgress.map((group) => (
                  <ChallengeCard key={group.id} group={group as GroupType} />
                ))}
              </div>
            </div>
          )}

          {/* CHALLENGES À VENIR */}
          {challengeToCome.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Mes challenges à venir</h2>
              <div className="flex overflow-scroll snap-mandatory gap-3 no-scrollbar">
                {challengeToCome.map((group) => (
                  <ChallengeCard key={group.id} group={group as GroupType} />
                ))}
              </div>
            </div>
          )}

          {/* CHALLENGES TERMINÉS */}
          {challengeFinished.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Mes challenges terminés</h2>
              <div className="flex overflow-scroll snap-mandatory gap-3 no-scrollbar">
                {challengeFinished.map((group) => (
                  <ChallengeCard key={group.id} group={group as GroupType} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;
