import { Bell, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import {
  NotificationStatusEnum,
  NotificationTypeEnum,
  User,
} from "@/types/global";
import { Button } from "./button";
import {
  useAddFriendMutation,
  useRemoveUserFromGroupMutation,
  useUpdateNotificationStatusMutation,
} from "@/gql/generated/schema";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type NotificationProps = {
  type: NotificationTypeEnum;
  sender: User;
  notifId: number;
  handleTraitedNotifs: () => void;
  group?:
    | {
        __typename?: "Group" | undefined;
        id: number;
        challengeName: string;
        startDate: any;
        endDate: any;
      }
    | null
    | undefined;
};

export const Notification = ({
  type,
  sender,
  notifId,
  handleTraitedNotifs,
  group,
}: NotificationProps) => {
  const { currentUser, refetchCurrentUser } = useCurrentUser();
  const [updateStatusMutation] = useUpdateNotificationStatusMutation();
  const [addFriend] = useAddFriendMutation();
  const [removeUserFromGroup] = useRemoveUserFromGroupMutation();

  const icon =
    type === NotificationTypeEnum.FRIEND_REQUEST ? <UserPlus /> : <Bell />;

  const handleAcceptNotif = async () => {
    try {
      await updateStatusMutation({
        variables: {
          data: {
            notificationId: notifId,
            status: NotificationStatusEnum.ACCEPTED,
          },
        },
      });

      if (type === NotificationTypeEnum.FRIEND_REQUEST) {
        await addFriend({
          variables: {
            friendId: sender.id,
          },
        });

        toast.success(
          `Vous êtes maintenant ami avec ${sender.firstName} ${sender.lastName} !`
        );
      }

      handleTraitedNotifs();
      refetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefuseNotif = async () => {
    try {
      await updateStatusMutation({
        variables: {
          data: {
            notificationId: notifId,
            status: NotificationStatusEnum.REJECTED,
          },
        },
      });

      if (group?.id && currentUser?.id) {
        await removeUserFromGroup({
          variables: {
            data: {
              groupId: group.id,
              userId: currentUser.id,
            },
          },
        });
      }

      handleTraitedNotifs();
      refetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

  const notifMessage = () => {
    if (type === NotificationTypeEnum.FRIEND_REQUEST) {
      return (
        <div>
          <p className="text-sm">
            <span className="font-semibold mr-2">
              {sender.firstName} {sender.lastName}
            </span>
            vous a envoyé une demande d'amis
          </p>
        </div>
      );
    }

    if (type === NotificationTypeEnum.CHALLENGE_REQUEST) {
      return (
        <div>
          <p className="text-sm">
            <span className="font-semibold mr-2">
              {sender.firstName} {sender.lastName}
            </span>
            vous a invité à son challenge{" "}
            <span className="font-semibold">{group?.challengeName}</span>
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex gap-4 shadow-main px-4 py-3 rounded-xl">
        {icon}
        <div className="flex flex-col gap-1">
          {notifMessage()}
          <div className="flex items-center gap-1 mt-2">
            <Button
              onClick={handleAcceptNotif}
              type="button"
              variant="secondary"
              className="w-full text-xs"
              size="icon"
            >
              Accepter
            </Button>
            <Button
              onClick={handleRefuseNotif}
              type="button"
              variant="destructive"
              className="w-full text-xs"
              size="icon"
            >
              Refuser
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
