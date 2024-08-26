import { Eye } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { EcoActionType, GroupeCreationType } from "@/types/global";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import EcoActionDetailsCard from "./EcoActionDetailsCard";

interface SelectableEcoActionProps {
  ecoAction: EcoActionType;
  field: ControllerRenderProps<GroupeCreationType, "ecoActionsIds">;
}

function SelectableEcoAction({ ecoAction, field }: SelectableEcoActionProps) {
  return (
    <div
      key={ecoAction.id}
      className="flex items-center justify-between w-full md:w-auto space-x-4 py-1 px-4 bg-card text-card-foreground text-sm font-medium rounded-3xl"
    >
      <span>{ecoAction.name}</span>
      <div className="flex items-center space-x-2">
        <EcoActionDetailsCard
          ecoAction={ecoAction}
          trigger={
            <Button type="button" variant="ghost" className="p-1 h-auto">
              <Eye size="24" />
            </Button>
          }
        />
        <FormControl>
          <Checkbox
            className="h-6 w-6 rounded-xl border-2"
            checked={field.value?.includes(ecoAction.id)}
            onCheckedChange={(checked) => {
              return checked
                ? field.onChange([...field.value, ecoAction.id])
                : field.onChange(
                    field.value?.filter((value) => value !== ecoAction.id)
                  );
            }}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default SelectableEcoAction;
