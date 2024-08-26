import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  useGetUserEcoActionQuery,
  useGetValidationQuery,
} from "@/gql/generated/schema";
import { X } from "lucide-react";

interface ValidationDetailsProps {
  groupId: number;
  ecoActionId: number;
}

const ValidationDetails = ({
  groupId,
  ecoActionId,
}: ValidationDetailsProps) => {
  const { data, loading } = useGetUserEcoActionQuery({
    variables: { groupId, ecoActionId },
  });
  const userEcoAction = data?.getUserEcoAction;

  // const { data: validationData, loading: validationLoading } =
  //   useGetValidationQuery({
  //     variables: { getValidationId: userEcoAction?.validationId || 0 },
  //   });
  // const validation = validationData?.getValidation;

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-accent-blue hover:text-[#0061c7] underline">
        MA VALIDATION
      </DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <div className="flex justify-end items-center">
          <DialogClose className="h-4 w-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">Ma note</DialogTitle>
        </DialogHeader>
        <p className="text-center text-md text-accent-blue font-semibold my-1">{`${
          userEcoAction?.points !== undefined ? userEcoAction.points : 0
        } points`}</p>
        {!userEcoAction?.proof ? (
          <h5 className="text-center text-md font-semibold my-1">
            Aucune preuve fournie
          </h5>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-center text-md font-semibold my-1">
              Ma preuve
            </h5>
            <img
              className="max-h-48 max-w-48"
              src={userEcoAction?.proof}
              alt="preuve de validation"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ValidationDetails;
