import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Notification } from "./ui/notification";
import { useGetNotificationsQuery } from "@/gql/generated/schema";

function Notifications() {
  const { data: getNotifs } = useGetNotificationsQuery();
  const notifs = getNotifs?.getNotifications ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div className="relative">
          <Button className="rounded-full p-2">
            <Bell color="#e8eede" />
          </Button>
          <span className="absolute top-0 right-1 h-2 w-2 rounded-full bg-accent-orange"></span>
        </div>
      </SheetTrigger>
      <SheetContent position="right" size="full">
        <SheetHeader>
          <SheetTitle className="text-xl">Notifications</SheetTitle>
          {notifs.length === 0 && (
            <SheetDescription>Aucune notifications...</SheetDescription>
          )}
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {notifs.map((notif) => (
            <Notification
              icon={<Bell />}
              title={notif.type}
              message={
                <div className="flex gap-4">
                  <Button variant="secondary">Accepter</Button>
                  <Button variant="destructive">Décliner</Button>
                </div>
              }
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Notifications;
