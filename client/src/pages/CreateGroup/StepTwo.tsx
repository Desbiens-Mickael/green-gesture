import { Control } from "react-hook-form";

import { Button } from "../../components/ui/button";
import { FormField, FormMessage } from "../../components/ui/form";
import { GroupeCreationType } from "../../types/global";
import {
  useGetFreeEcoActionsQuery,
  useGetPopularFreeEcoActionsQuery,
  useGetUserEcoActionsQuery,
} from "../../gql/generated/schema";

import SelectableEcoAction from "@/components/SelectableEcoAction";

type StepTwoProps = {
  control: Control<GroupeCreationType, any>;
  handleGoBackInStep: () => void;
};

function StepTwo({ control, handleGoBackInStep }: StepTwoProps) {
  const { data: popularEcoActions, loading: loadingPopularEcoActions } =
    useGetPopularFreeEcoActionsQuery();
  const popularEcoActionsList =
    popularEcoActions?.getPopularFreeEcoActions || [];

  const { data: freeEcoActions, loading: loadingFreeEcoActions } =
    useGetFreeEcoActionsQuery();
  const freeEcoActionsList = freeEcoActions?.getFreeEcoActions || [];

  const { data: userEcoActions, loading: loadingUserEcoActions } =
    useGetUserEcoActionsQuery();
  const userEcoActionsList = userEcoActions?.getUserEcoActions || [];

  const ecoActionsList = [...freeEcoActionsList, ...userEcoActionsList];

  return (
    <div>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 2</h1>
        <p className="font-medium">Sélection des Éco-gestes</p>
      </div>

      <FormField
        control={control}
        name="ecoActionsIds"
        render={({ field }) => (
          <div className="space-y-6 w-full mt-7">
            <div className="space-y-2">
              <p className="font-semibold text-base">
                Les Éco-gestes populaires
              </p>
              <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-3">
                {popularEcoActionsList.slice(0, 3).map((ecoAction) => (
                  <SelectableEcoAction
                    key={ecoAction.id}
                    ecoAction={ecoAction}
                    field={field}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-base">
                Mes Éco-gestes disponibles
              </p>
              <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-3">
                {ecoActionsList.map((ecoAction) => (
                  <SelectableEcoAction
                    key={ecoAction.id}
                    ecoAction={ecoAction}
                    field={field}
                  />
                ))}
              </div>
            </div>
            <FormMessage />
          </div>
        )}
      />

      <div className="flex items-center gap-1 mt-10">
        <Button
          onClick={handleGoBackInStep}
          type="button"
          variant="outline"
          className="w-full"
        >
          Retour
        </Button>
        <Button type="submit" className="w-full">
          Suivant
        </Button>
      </div>
    </div>
  );
}

export default StepTwo;
