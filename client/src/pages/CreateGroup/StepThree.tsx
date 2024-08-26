import { Control } from "react-hook-form";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { FormControl, FormField, FormMessage } from "../../components/ui/form";
import { GroupeCreationType, User } from "../../types/global";
import { FriendList } from "@/components/FriendList";
import { Plus } from "lucide-react";

type StepThreeProps = {
  control: Control<GroupeCreationType, any>;
  isPartner: boolean;
  isTeamChallenge: boolean;
  handleGoBackInStep: () => void;
  friends: Partial<User>[];
};

function StepThree({
  control,
  isPartner,
  isTeamChallenge,
  handleGoBackInStep,
  friends,
}: StepThreeProps) {
  return (
    <div>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 3</h1>
        <p className="font-medium">Sélection des participants</p>
      </div>

      <FormField
        control={control}
        name="participants"
        render={({ field }) => (
          <div className="space-y-4 w-full mt-7">
            <p className="font-semibold text-base">Invitez vos amis</p>
            <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-3">
              {friends.length > 1 ? (
                friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between w-full md:w-auto space-x-4 py-2 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
                  >
                    <span>
                      {friend.firstName} {friend.lastName}
                    </span>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="h-6 w-6 rounded-xl border-2"
                          checked={
                            field.value?.filter((user) => user.id === friend.id)
                              .length > 0
                          }
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  {
                                    id: friend.id,
                                    name: `${friend.firstName} ${friend.lastName}`,
                                  },
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (user) => user.id !== friend.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p>
                    Vous n'avez pas encore (ou pas assez) d'amis, ajoutez-en au
                    moins 2 pour continuer !
                  </p>
                  <FriendList>
                    <Button
                      asChild={true}
                      variant="secondary"
                      className="ml-1 rounded-full p-2 h-auto cursor-pointer"
                      title="Ajouter un ami"
                    >
                      <div>
                        Ajouter un ami <Plus color="#e8eede" size={22} />
                      </div>
                    </Button>
                  </FriendList>
                </div>
              )}
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
          {isPartner && isTeamChallenge
            ? "Suivant"
            : !isTeamChallenge
            ? "Créer"
            : "Créer"}
        </Button>
      </div>
    </div>
  );
}

export default StepThree;
