import { Link } from "react-router-dom";
import { Goal, LayoutList, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function AddButtonDropdownMenu() {
  const { currentUser } = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full p-2">
          <Plus color="#e8eede" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <Link to="/create-group">
          <DropdownMenuItem>
            <Goal className="mr-2 h-4 w-4" />
            <span>Créer un nouveau challenge</span>
          </DropdownMenuItem>
        </Link>
        {currentUser?.subscriptionType === "partner" && (
          <Link to="/create-eco-action">
            <DropdownMenuItem>
              <LayoutList className="mr-2 h-4 w-4" />
              <span>Créer un nouvel éco-geste</span>
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddButtonDropdownMenu;
