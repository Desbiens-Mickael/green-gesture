import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetAllValidationsQuery } from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";

interface CustomSelectMultipleProps {
  field: ControllerRenderProps<
    { name: string; description: string; validationIds: number[] },
    "validationIds"
  >;
  validations?: ValidationType[];
}

type ValidationType = {
  id: number;
  points: number;
};

const CustomSelectMultiple = ({
  field,
  validations = [],
}: CustomSelectMultipleProps) => {
  const [selected, setSelected] = useState<ValidationType[]>(validations);
  const { data, loading } = useGetAllValidationsQuery();

  useEffect(() => {
    field.onChange(selected.map((item) => item.id));
  }, [selected]);

  if (loading) return <Loading />;

  const handleAddSelect = (value: ValidationType) => {
    if (selected.includes(value)) return;
    setSelected((prev) => [...prev, value]);
  };

  const handelDeleteSelect = (value: number) => {
    setSelected((prev) => prev.filter((item) => item.id !== value));
  };

  return (
    <Select>
      <SelectTrigger className="w-[190px]">
        <SelectValue placeholder="Selection des points">
          {"Selection des points"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data?.getAllValidations.map((validation) => (
          <SelectItem
            key={validation.id}
            value={validation.id.toString()}
            onPointerUp={() => handleAddSelect(validation)}
          >
            {validation.points.toString()}
          </SelectItem>
        ))}
      </SelectContent>
      <div className="flex w-[190px]">
        {selected.map((value) => (
          <div
            key={value.id}
            className="flex justify-between w-10 px-1 mx-1 border rounded"
          >
            {value.points}
            <div
              className=" cursor-pointer text-red-600"
              onClick={() => handelDeleteSelect(value.id)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </Select>
  );
};
export default CustomSelectMultiple;
