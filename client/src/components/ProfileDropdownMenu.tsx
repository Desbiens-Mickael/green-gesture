import {
  Goal,
  LogOut,
  User,
  UserCircle2,
  Users,
  LayoutList,
} from "lucide-react";
import { Link } from "react-router-dom";
import client from "@/gql/client";
import { useLogoutMutation } from "@/gql/generated/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FriendList } from "./FriendList";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function ProfileDropDownMenu() {
  const { currentUser } = useCurrentUser();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("err", err);
    } finally {
      client.resetStore();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full p-2">
          <UserCircle2 color="#e8eede" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-[15px]">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Mon profil</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/groups">
            <DropdownMenuItem>
              <Goal className="mr-2 h-4 w-4" />
              <span>Mes challenges</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/eco-actions">
            <DropdownMenuItem>
              <LayoutList className="mr-2 h-4 w-4" />
              <span>Les éco-gestes</span>
            </DropdownMenuItem>
          </Link>
          <FriendList>
            <div className="flex items-center hover:bg-accent py-[6px] px-2 cursor-pointer rounded-sm">
              <Users className="mr-2 h-4 w-4" />
              <span>Mes amis</span>
            </div>
          </FriendList>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDownMenu;
