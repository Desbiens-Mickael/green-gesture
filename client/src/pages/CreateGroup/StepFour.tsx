import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { FormField, FormLabel, FormMessage } from "../../components/ui/form";
import { GroupeCreationType, Participant } from "../../types/global";
import { Input } from "../../components/ui/input";
import { CreateTeamInput } from "@/gql/generated/schema";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type StepFourProps = {
  control: Control<GroupeCreationType, any>;
  handleGoBackInStep: () => void;
  selectedParticipants: Participant[];
  form: any;
};

const DEFAULT_TEAMS: CreateTeamInput[] = [
  {
    name: "Équipe 1",
    userIds: [],
  },
  {
    name: "Équipe 2",
    userIds: [],
  },
];

function StepFour({
  control,
  handleGoBackInStep,
  selectedParticipants,
  form,
}: StepFourProps) {
  const [currentTeams, setCurrentTeams] = useState<CreateTeamInput[]>(
    JSON.parse(JSON.stringify(DEFAULT_TEAMS))
  );
  const { currentUser } = useCurrentUser();

  const [availableParticipants, setAvailableParticipants] = useState<
    Participant[]
  >([...selectedParticipants]);

  const [participantsAddedToTeam, setParticipantsAddedToTeam] = useState<
    Participant[]
  >([...selectedParticipants]);

  useEffect(() => {
    if (currentUser?.id === undefined || currentUser?.firstName === undefined) {
      return;
    }

    const currentUserAsParticipant: Participant = {
      id: currentUser.id,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
    };

    setAvailableParticipants([
      ...availableParticipants,
      currentUserAsParticipant,
    ]);

    setParticipantsAddedToTeam([
      ...participantsAddedToTeam,
      currentUserAsParticipant,
    ]);
  }, [currentUser]);

  const handleTeamsName = (
    name: string,
    index: number,
    team: CreateTeamInput
  ) => {
    team["name"] = name;

    const teams = form.getValues("teams");
    const updatedTeams = [...currentTeams];
    updatedTeams[index] = team;

    if (teams.length === 0) {
      teams.push(updatedTeams);
    } else {
      teams[index] = team;
    }
    setCurrentTeams(updatedTeams);
    form.setValue("teams", teams);
  };

  const handleParticipants = (
    participant: Participant,
    team: CreateTeamInput,
    index: number,
    hasUser: boolean
  ) => {
    if (!hasUser) {
      team.userIds = team.userIds.filter((id) => id !== participant.id);
      const newParticipants = [...availableParticipants];
      newParticipants.push(participant);
      setAvailableParticipants([...newParticipants]);
    } else {
      team.userIds.push(participant.id);
      const newParticipants = [...availableParticipants];
      setAvailableParticipants(
        newParticipants.filter((p) => p.id !== participant.id)
      );
    }

    const teams = form.getValues("teams");
    const updatedTeams = [...currentTeams];
    updatedTeams[index] = team;

    if (teams.length === 0) {
      teams.push(updatedTeams);
    } else {
      teams[index] = team;
    }

    setCurrentTeams(updatedTeams);
    form.setValue("teams", teams);
  };

  return (
    <>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 4</h1>
        <p className="font-medium">Composition des équipes</p>
      </div>

      <FormField
        control={control}
        name="teams"
        render={({}) => (
          <>
            {currentTeams.map((team, index) => (
              <div className="py-4" key={index}>
                <div className="space-y-4 mt-5 mb-3">
                  <FormLabel>Nom de l'équipe</FormLabel>
                  <Input
                    type="text"
                    placeholder={`Équipe ${index + 1}`}
                    onChange={(e) =>
                      handleTeamsName(e.target.value, index, team)
                    }
                  />

                  {team.userIds.length > 0 && <p>Joueurs sélectionnés :</p>}
                  {participantsAddedToTeam
                    .filter((part) => team.userIds.includes(part.id))
                    .map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between w-full md:w-auto space-x-4 py-2 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
                      >
                        <span>{participant.name}</span>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            className="h-6 w-6 rounded-xl border-2"
                            onCheckedChange={(checked) => {
                              handleParticipants(
                                participant,
                                team,
                                index,
                                !!checked
                              );
                            }}
                            checked
                          />
                        </div>
                      </div>
                    ))}
                  {availableParticipants.length > 0 ? (
                    <p>Joueurs disponibles :</p>
                  ) : (
                    <p>Il n'y a plus de joueurs disponibles</p>
                  )}
                  {availableParticipants.length > 0 &&
                    availableParticipants.map((availableParticipant) => (
                      <div
                        key={availableParticipant.id}
                        className="flex items-center justify-between w-full md:w-auto space-x-4 py-2 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
                      >
                        <span>{availableParticipant.name}</span>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            className="h-6 w-6 rounded-xl border-2"
                            onCheckedChange={(checked) => {
                              handleParticipants(
                                availableParticipant,
                                team,
                                index,
                                !!checked
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <FormMessage />
              </div>
            ))}
          </>
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
          Créer
        </Button>
      </div>
    </>
  );
}

export default StepFour;
