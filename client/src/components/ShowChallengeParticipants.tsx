import { Hourglass, UserPlus2, X } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { NotificationTypeEnum, User } from "@/types/global";
import { Button } from "./ui/button";
import {
  useGetUsersAlreadyAddedQuery,
  useRemoveFriendMutation,
  useSendNotificationMutation,
} from "@/gql/generated/schema";
import { Fragment } from "react";

interface ShowChallengeParticipantsProps {
  component: React.ReactNode;
  participants: Partial<User>[];
}

function ShowChallengeParticipants({
  component,
  participants,
}: ShowChallengeParticipantsProps) {
  const { currentUser } = useCurrentUser();
  const userFriends = currentUser?.friends ?? [];

  const { data: usersAlreadyAdded, refetch: refetchUsersAlreadyAdded } =
    useGetUsersAlreadyAddedQuery();
  const usersAdded = usersAlreadyAdded?.getUsersAlreadyAdded || [];

  // Mutations
  const [sendNotification] = useSendNotificationMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const handleFriendship = async (
    participant: Partial<User>,
    isFriend: boolean,
    isAdded: boolean
  ) => {
    if (isAdded) return;
    if (isFriend) {
      const confirm = window.confirm(
        "Voulez-vous vraiment supprimer cet ami ?"
      );
      if (!confirm) return;
      await removeFriend({ variables: { friendId: participant.id! } });
    } else {
      if (!currentUser) return;
      await sendNotification({
        variables: {
          data: {
            receiverId: participant.id!,
            type: NotificationTypeEnum.FRIEND_REQUEST,
            groupId: null,
          },
        },
      });
      await refetchUsersAlreadyAdded();
    }
  };

  const displayParticipant = (participant: Partial<User>) => {
    // check if participant is a friend of the current user
    const isFriend = userFriends.some((friend) => friend.id === participant.id);

    // check if participant is the current user
    const isCurrentUser = participant.id === currentUser?.id;

    // check if participant has already been added
    const isAdded = usersAdded.some((user) => user.id === participant.id);

    return (
      <div className="flex items-center justify-between bg-card p-2 rounded">
        <p>
          {participant.firstName} {participant.lastName}
        </p>
        {!isCurrentUser && (
          <Button
            variant={isFriend ? "destructive" : "secondary"}
            size="icon"
            className="p-1 w-6 h-6"
            onClick={() => handleFriendship(participant, isFriend, isAdded)}
          >
            {isAdded && <Hourglass size={18} />}
            {isFriend && <X />}
            {!isFriend && !isAdded && <UserPlus2 />}
          </Button>
        )}
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div className="w-full md:w-auto cursor-pointer">{component}</div>
      </SheetTrigger>
      <SheetContent position="bottom" size="eco-geste">
        <div className="max-w-3xl mx-auto">
          <SheetHeader>
            <div>
              <SheetTitle className="text-xl">Participants</SheetTitle>
            </div>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {participants.map((participant) => (
              <Fragment key={participant.id}>
                {displayParticipant(participant)}
              </Fragment>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ShowChallengeParticipants;
