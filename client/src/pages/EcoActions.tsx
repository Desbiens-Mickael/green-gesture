import EcoActionCard from "@/components/EcoActionCard";
import { Button } from "@/components/ui/button";
import {
  useGetFreeEcoActionsQuery,
  useGetUserEcoActionsQuery,
} from "@/gql/generated/schema";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { EcoActionType } from "@/types/global";
import { Link } from "react-router-dom";

function EcoActions() {
  const { currentUser } = useCurrentUser();
  const isPartner = currentUser?.subscriptionType === "partner";

  const { data: freeEcoActions, loading: loadingFreeEcoActions } =
    useGetFreeEcoActionsQuery();
  const freeEcoActionsList = freeEcoActions?.getFreeEcoActions || [];

  const { data: userEcoActions, loading: loadingUserEcoActions } =
    useGetUserEcoActionsQuery();
  const userEcoActionsList = userEcoActions?.getUserEcoActions || [];

  return (
    <div className="py-4">
      <div className="space-y-8">
        {/* USER PARTNER ECO ACTIONS */}
        {isPartner && userEcoActionsList.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3">Mes éco-gestes</h2>
            <div className="flex overflow-scroll snap-mandatory gap-3 w-full no-scrollbar">
              {userEcoActionsList?.map((ecoAction) => (
                <EcoActionCard
                  key={ecoAction.id}
                  ecoAction={ecoAction as EcoActionType}
                  isPartner
                />
              ))}
            </div>
          </div>
        )}
        {isPartner && userEcoActionsList.length === 0 && (
          <div>
            <h2 className="font-semibold">Mes éco-gestes</h2>
            <p className="my-3 text-sm">
              Vous n'avez pas encore vos propres éco-gestes...
            </p>
            <Button asChild={true} variant="secondary" size="sm">
              <Link to="/create-eco-action">Créer mon premier éco-geste</Link>
            </Button>
          </div>
        )}

        {/* ALL FREE ECO ACTIONS */}
        <div>
          <h2 className="font-semibold mb-3">Tous les éco-gestes</h2>
          <div className="flex flex-wrap gap-3 w-full">
            {freeEcoActionsList?.map((ecoAction) => (
              <EcoActionCard key={ecoAction.id} ecoAction={ecoAction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcoActions;
