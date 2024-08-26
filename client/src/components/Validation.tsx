import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import FilesUploader from "./FilesUploader";
import {
  useCreateUserEcoActionMutation,
  useGetValidationsByEcoActionQuery,
} from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";

interface ValidationProps {
  ecoActionId: number;
  groupId: number;
  refetchParent: () => void;
}

const Validation = ({
  ecoActionId,
  groupId,
  refetchParent,
}: ValidationProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string>("0");
  const [fileUrl, setFileUrl] = useState<string>("");

  const { data, loading } = useGetValidationsByEcoActionQuery({
    variables: { ecoActionId },
  });
  const validations = data?.getValidationsByEcoAction;

  const [createUserEcoAction] = useCreateUserEcoActionMutation();

  useEffect(() => {
    if (validations && validations[0]) {
      setSelectedPoint(validations[0].points.toString());
    }
  }, [validations]);

  if (loading || validations === undefined) return <Loading />;

  const handleChange = (value: string) => {
    setSelectedPoint(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        confirm(`Voulez-vous valider votre défi avec ${selectedPoint} points ?`)
      )
        await createUserEcoAction({
          variables: {
            data: {
              ecoActionId,
              groupId,
              points: parseInt(selectedPoint),
              proof: fileUrl,
            },
          },
        });

      toast.success("Défi validé !");
      refetchParent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="text-xs text-accent-blue hover:text-[#0061c7] underline"
        onClick={() => setOpen(!open)}
      >
        VALIDER
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0 rounded-xl">
        <div className="flex justify-end items-center">
          <DialogClose onClick={() => setOpen(false)} className="h-4 w-4">
            <X className="h-4 w-4 cursor-pointer" />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">Je note mon défi</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <RadioGroup
            defaultValue={validations[0].points.toString()}
            className="flex flex-row justify-center mb-5"
            onValueChange={(value) => handleChange(value as string)}
          >
            {validations?.map((validation) => (
              <div
                className="flex flex-col-reverse justify-between items-center space-x-2 gap-2"
                key={validation.id}
              >
                <RadioGroupItem
                  value={validation.points.toString()}
                  id={validation.id.toString()}
                />
                <Label htmlFor={validation.id.toString()}>
                  {validation.points} pts
                </Label>
              </div>
            ))}
          </RadioGroup>
          <h2 className="text-center">J'ajoute une preuve</h2>
          <div className="mt-2 mb-5 mx-auto flex justify-center items-center">
            <FilesUploader setFileUrl={setFileUrl} />
          </div>
          <DialogFooter className="flex flex-row justify-center gap-3 sm:justify-evenly items-center">
            <DialogClose
              className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground rounded-3xl h-10 p-2"
              onClick={() => setOpen(!open)}
            >
              ANNULER
            </DialogClose>
            <Button className="bg-accent-blue hover:bg-[#0061c7]" type="submit">
              JE VALIDE
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Validation;
