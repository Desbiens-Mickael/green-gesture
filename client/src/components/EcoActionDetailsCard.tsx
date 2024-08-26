import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loading } from "@/pages/Loading";
import { XCircle } from "lucide-react";

import { useGetNumberLikesQuery } from "@/gql/generated/schema";
import LikeComponent from "./LikeComponent";
import { EcoActionType } from "@/types/global";

interface EcoActionDetailsCardProps {
  ecoAction: EcoActionType;
  trigger?: React.ReactNode;
}

const EcoActionDetailsCard = ({
  ecoAction,
  trigger,
}: EcoActionDetailsCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={true}>{trigger}</DialogTrigger>
      <DialogContent className="bg-grey-green border-0">
        <div className="flex items-center justify-between">
          <LikeComponent ecoActionId={ecoAction.id} />
          <DialogClose className="ml-auto">
            <XCircle size={24} />
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center">{ecoAction.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <h5 className="text-md font-semibold">Description de l'éco-geste</h5>
          <p className="text-xs">{ecoAction.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoActionDetailsCard;
