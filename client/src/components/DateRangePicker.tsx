import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Control } from "react-hook-form";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FormField, FormItem, FormLabel } from "./ui/form";
import { GroupeCreationType } from "../types/global";

type DatePickerWithRangeProps = {
  className?: React.HTMLAttributes<HTMLDivElement>;
  control: Control<GroupeCreationType, any>;
};

export function DatePickerWithRange({
  className,
  control,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <FormField
        control={control}
        name="dates"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Dates du challenge</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left capitalize font-normal hover:bg-white",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y", { locale: fr })}{" "}
                        - {format(field.value.to, "LLL dd, y", { locale: fr })}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="center"
                side="bottom"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  fromDate={field.value?.from || new Date()}
                  fixedWeeks={true}
                  showOutsideDays={true}
                  selected={field.value as DateRange}
                  onSelect={field.onChange}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
}
