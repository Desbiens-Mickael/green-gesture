import { Control } from "react-hook-form";
import CustomFormField from "../../components/CustomFormField";
import { DatePickerWithRange } from "../../components/DateRangePicker";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { GroupeCreationType } from "../../types/global";

type StepOneProps = {
  control: Control<GroupeCreationType, any>;
  isPartner: boolean;
  isTeamChallenge: boolean;
  handleIsTeamChallenge: (value: boolean) => void;
};

function StepOne({
  control,
  isPartner,
  isTeamChallenge,
  handleIsTeamChallenge,
}: StepOneProps) {
  return (
    <>
      <div className="-space-y-1">
        <h1 className="font-bold text-2xl">Étape 1</h1>
        <p className="font-medium">Configuration</p>
      </div>

      <div className="space-y-5 w-full mt-7">
        <CustomFormField
          control={control}
          label="Nom du groupe"
          name="name"
          placeholder="Artemis"
        />
        <CustomFormField
          control={control}
          label="Nom du challenge"
          name="challengeName"
          placeholder="Mon super challenge"
        />
        <DatePickerWithRange control={control} />
        {isPartner && (
          <div className="flex items-center space-x-4">
            <Label htmlFor="team">Challenge par équipes :</Label>
            <Checkbox
              id="team"
              checked={isTeamChallenge}
              onCheckedChange={handleIsTeamChallenge}
            />
          </div>
        )}
      </div>
      <Button type="submit" className="mt-10 w-full">
        Suivant
      </Button>
    </>
  );
}

export default StepOne;
