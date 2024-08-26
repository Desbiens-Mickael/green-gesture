import { Formula } from "@/types/global";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export type Radio = {
  id: string;
  value: string;
  label: string;
  type: "primary" | "secondary";
  hint?: string;
};

type RadioButtonsProps = {
  radios: Radio[];
  selectedFormula?: Formula;
  onChange: (value: Formula) => void;
  defaultValue: string;
};

function RadioButtons({
  radios,
  selectedFormula,
  onChange,
  defaultValue,
}: RadioButtonsProps) {
  return (
    <RadioGroup
      className="space-y-4 w-full"
      onValueChange={onChange}
      defaultValue={defaultValue}
      value={selectedFormula}
    >
      {radios.map((radio, idx) => (
        <Label
          htmlFor={radio.id}
          className={`flex items-center justify-between w-full rounded-3xl px-5 py-3 ${
            radio.type === "primary" ? "bg-light-green" : "bg-accent-blue"
          }`}
          key={idx}
        >
          <div className="space-x-3 flex flex-1 items-center">
            <RadioGroupItem
              className="bg-white"
              id={radio.id}
              value={radio.value}
            />
            <p
              className={`uppercase text-sm font-medium ${
                radio.type === "primary"
                  ? "text-dark-green"
                  : "text-white-green"
              }`}
            >
              {radio.label}
            </p>
          </div>
          {radio.hint && (
            <div className="flex-end">
              <p className="font-normal text-white-green">{radio.hint}</p>
            </div>
          )}
        </Label>
      ))}
    </RadioGroup>
  );
}

export default RadioButtons;
