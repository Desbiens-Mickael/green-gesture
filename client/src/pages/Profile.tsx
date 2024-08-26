import toast from "react-hot-toast";
import { ArrowRight, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnsubscribeMutation } from "@/gql/generated/schema";

import { Badge } from "../components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loading } from "./Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FriendList } from "@/components/FriendList";

function Profile() {
  const { currentUser, loading, refetchCurrentUser } = useCurrentUser();
  const [Unsubscribe] = useUnsubscribeMutation();

  const handleUnsubscribe = async () => {
    try {
      if (confirm("Êtes-vous sûr de vouloir vous désabonner ?")) {
        const res = await fetch("http://localhost:4002/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriptionId: currentUser?.subscriptionId,
          }),
        }).then((res) => res.json());
        if (res.success) await Unsubscribe();
        toast.success("Vous êtes désormais désabonné !");
        await refetchCurrentUser();
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold">
          Bienvenue, {currentUser?.firstName} {currentUser?.lastName}
        </h1>
        {currentUser?.subscriptionType === "partner" && (
          <Badge variant="accent" className="text-sm font-semibold">
            Partner
          </Badge>
        )}
      </div>
      {/* BUTTONS */}
      <div className="flex justify-between items-center flex-wrap gap-2 my-8">
        <div className="flex items-center flex-wrap gap-2 my-8">
          <Button className="flex w-full sm:w-auto" asChild={true}>
            <Link to="/groups">
              Mes challenges <ArrowRight className="ms-3" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex w-full sm:w-auto"
            asChild={true}
          >
            <Link to="/eco-actions">
              Mes eco-gestes <ArrowRight className="ms-3" />
            </Link>
          </Button>
        </div>
        {currentUser?.subscriptionType === "partner" && (
          <Button
            className="flex w-full sm:w-auto bg-red-600 hover:bg-red-700"
            onClick={handleUnsubscribe}
          >
            Me désabonner
          </Button>
        )}
      </div>
      {/* PROFILE */}
      <div className="space-y-8">
        {/* PERSONNAL INFOS */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Mes informations personnelles
          </h2>
          <div className="elevate-box space-y-4">
            <div>
              <h5 className="text-sm font-semibold">Nom</h5>
              <p className="mt-1 text-xs">{currentUser?.lastName}</p>
            </div>
            <div>
              <h5 className="text-sm font-semibold">Prénom</h5>
              <p className="mt-1 text-xs">{currentUser?.firstName}</p>
            </div>
            <div>
              <h5 className="text-sm font-semibold">Email</h5>
              <p className="mt-1 text-xs">{currentUser?.email}</p>
            </div>
          </div>
        </div>
        {/* COMPANY */}
        {currentUser?.subscriptionType === "partner" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Mon entreprise</h2>
            <div className="elevate-box space-y-4">
              <div>
                <h5 className="text-sm font-semibold">Nom de l'entreprise</h5>
                <p className="mt-1 text-xs">
                  {currentUser?.company?.name ?? "Aucune entreprise"}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-semibold">
                  Nombre d'utilisateurs de l'entreprise
                </h5>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-base">
                    {currentUser?.company?.users?.length ?? 0} utilisateurs
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {}}
                    className="p-2 h-auto"
                    title="Voir les utilisateurs"
                  >
                    <Eye color="#224820" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* FRIENDS */}
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold me-3">Mes amis</h2>
            <FriendList>
              <Button
                asChild={true}
                variant="accent-orange"
                className="rounded-full p-1 h-auto cursor-pointer"
                title="Ajouter un ami"
              >
                <Plus color="#e8eede" size={22} />
              </Button>
            </FriendList>
          </div>
          <div className="elevate-box space-y-4">
            {currentUser?.friends?.length === 0 && (
              <p className="text-sm font-medium">Pas encore d'amis...</p>
            )}
            {currentUser?.friends?.map((friend) => (
              <div
                key={friend.id}
                className="flex bg-grey-green p-2 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center font-bold p-2 w-8 text-xs rounded-full bg-light-green text-primary">
                    {friend.firstName.split("")[0]}
                  </span>
                  <h5 className="text-sm font-semibold">
                    {friend.firstName} {friend.lastName}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
