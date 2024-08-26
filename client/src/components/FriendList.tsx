import { PropsWithChildren, useEffect, useState } from "react";
import { Hourglass, UserPlus2, X } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import {
  User,
  useGetUsersAlreadyAddedQuery,
  useGetUsersByNameQuery,
  useRemoveFriendMutation,
  useSendNotificationMutation,
} from "@/gql/generated/schema";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NotificationTypeEnum } from "@/types/global";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const FriendList = ({ children }: PropsWithChildren) => {
  const { currentUser, refetchCurrentUser } = useCurrentUser();
  const [sendNotification] = useSendNotificationMutation();

  const { data: usersAlreadyAdded, refetch: refetchUsersAlreadyAdded } =
    useGetUsersAlreadyAddedQuery();
  const usersAdded = usersAlreadyAdded?.getUsersAlreadyAdded || [];

  const [removeFriend] = useRemoveFriendMutation();

  const [search, setSearch] = useState("");
  const { data: foundUsers, refetch } = useGetUsersByNameQuery({
    variables: { name: search },
  });
  const searchedUsers = foundUsers?.getUsersByName;

  useEffect(() => {
    refetch();
  }, [search]);

  const onSheetOpen = (openState: boolean) => {
    if (!openState) return;
    refetchCurrentUser();
    refetchUsersAlreadyAdded();
  };

  const handleAddFriend = async (user: User) => {
    if (!currentUser) return;
    try {
      await sendNotification({
        variables: {
          data: {
            receiverId: user.id,
            type: NotificationTypeEnum.FRIEND_REQUEST,
            groupId: null,
          },
        },
      });
      await refetchUsersAlreadyAdded();
      setSearch("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFriend = async (friendId: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cet ami ?");
    if (!confirm) return;
    try {
      await removeFriend({ variables: { friendId } });
      refetchCurrentUser();

      toast.success("Ami supprimé");
    } catch (error) {
      console.error(error);
    }
  };

  const displayUser = (user: any, idx: number) => {
    if (usersAdded.findIndex((val) => val.id === user.id) !== -1) return;

    return (
      <div
        key={idx}
        className="flex justify-between bg-card py-2 px-4 rounded-3xl"
      >
        <p>
          {user.firstName} {user.lastName}
        </p>
        <Button
          variant="secondary"
          className="p-0 w-6 h-6"
          onClick={() => handleAddFriend(user)}
        >
          <UserPlus2 className="text-white w-5 h-5" />
        </Button>
      </div>
    );
  };

  const displayAlreadAddedUsers = () => {
    return usersAdded.map((user, idx) => (
      <div
        key={idx}
        className="flex items-center justify-between bg-muted py-1 px-2 rounded"
      >
        <p>
          {user.firstName} {user.lastName}
        </p>
        <Hourglass size={18} />
      </div>
    ));
  };

  return (
    <Sheet onOpenChange={(openState) => onSheetOpen(openState)}>
      <SheetTrigger asChild={true}>{children}</SheetTrigger>
      <SheetContent position="right" className="w-full md:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl">Mes amis</SheetTitle>
        </SheetHeader>
        <div className="mt-8 px-3 space-y-4">
          {/* INPUT D'AJOUT */}
          <div>
            <h3 className="font-bold mb-1">Ajouter un ami</h3>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            {searchedUsers && (
              <div className="flex flex-col gap-2 mt-3">
                {searchedUsers.map((user, idx) => displayUser(user, idx))}
              </div>
            )}
          </div>

          {/* DEMANDES EN ATTENTES */}
          <div>
            {usersAdded.length > 0 && (
              <>
                <h2 className="font-bold">Demandes en attentes</h2>
                {displayAlreadAddedUsers()}
              </>
            )}
          </div>

          {/* LISTE D'AMIS */}
          <div>
            <h2 className="font-bold">Liste d'amis</h2>
            <div className="flex flex-col gap-2 mt-3">
              {currentUser?.friends && currentUser.friends.length > 0 ? (
                currentUser.friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between bg-card p-2 rounded"
                  >
                    <p>
                      {friend.firstName} {friend.lastName}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="p-1 w-6 h-6"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      <X />
                    </Button>
                  </div>
                ))
              ) : (
                <p>Vous n'avez pas encore d'amis...</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
