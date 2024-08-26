import { useNavigate } from "react-router-dom";
import { EcoActionType } from "@/types/global";

import EcoActionDetailsCard from "./EcoActionDetailsCard";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";

interface EcoActionCardProps {
  ecoAction: EcoActionType;
  isPartner?: boolean;
}

function EcoActionCard({ ecoAction, isPartner = false }: EcoActionCardProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-evenly bg-card rounded-xl h-[135px] w-full lg:w-[32%] py-2 px-3">
      {isPartner && (
        <div className="absolute right-2 top-2">
          <Button
            variant="destructive"
            size="icon"
            className="p-1 w-6 h-6 self-end bg-accent-orange mt-1"
            onClick={() => navigate(`/eco-actions/${ecoAction.id}/edit`)}
          >
            <PenLine />
          </Button>
        </div>
      )}

      <div className="text-center">
        <h4 className="font-semibold text-sm">{ecoAction.name}</h4>
        <p className="text-2xs">{ecoAction.description.slice(0, 100)}...</p>
      </div>
      <EcoActionDetailsCard
        ecoAction={ecoAction}
        trigger={
          <Button variant="link" size="sm" className="text-xs">
            Découvrir
          </Button>
        }
      />
    </div>
  );
}

export default EcoActionCard;
