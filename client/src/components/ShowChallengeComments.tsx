import { useState } from "react";
import toast from "react-hot-toast";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { User } from "@/types/global";
import { Textarea } from "./ui/textarea";
import { useCreateCommentMutation } from "@/gql/generated/schema";
import { Button } from "./ui/button";

interface ShowChallengeCommentsProps {
  component: React.ReactNode;
  comments: {
    __typename?: "Comment" | undefined;
    id: number;
    createdAt: any;
    message: string;
    author: Partial<User>;
  }[];
  groupId: number;
  refetchComments: () => void;
}

function ShowChallengeComments({
  component,
  comments,
  groupId,
  refetchComments,
}: ShowChallengeCommentsProps) {
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [error, setError] = useState(false);
  const [messageHasBeenSent, setMessageHasBeenSent] = useState(false);

  const handleChange = (value: string) => {
    setError(false);
    setMessageHasBeenSent(false);
    setComment(value);
  };

  const sendComment = async () => {
    try {
      setError(false);
      setMessageHasBeenSent(false);
      await createComment({
        variables: {
          data: {
            message: comment,
            groupId,
          },
        },
      });

      setMessageHasBeenSent(true);
      toast.success("Votre commentaire a bien été envoyé !");
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setComment("");
      refetchComments();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <div className="w-full md:w-auto cursor-pointer">{component}</div>
      </SheetTrigger>
      <SheetContent
        className="overflow-y-scroll snap-mandatory max-h-full"
        position="bottom"
        size="eco-geste"
      >
        <div className="max-w-3xl mx-auto">
          <SheetHeader>
            <div>
              <SheetTitle className="text-xl">Commentaires</SheetTitle>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-3">
            <h3>Ajoutez un commentaire :</h3>
            <Textarea
              value={comment}
              onChange={(e) => handleChange(e.target.value)}
            />
            <Button onClick={sendComment}>Envoyer</Button>
            {error && (
              <p className="text-xs">
                Oups, votre commentaire n'a pas pu être envoyé, veuillez
                réessayer ultérieurement.
              </p>
            )}
            {messageHasBeenSent && (
              <p className="text-xs">Votre message a bien été envoyé !</p>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {comments.length === 0 && <p>Aucun commentaire...</p>}
            {comments.length > 0 &&
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="space-y-3 bg-grey-green p-2 rounded-xl"
                >
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center font-bold p-2 w-8 text-xs rounded-full bg-light-green text-primary">
                      {comment.author?.firstName?.split("")[0]}
                    </span>
                    <h5 className="text-xs font-semibold">
                      {comment.author?.firstName} {comment.author?.lastName}
                    </h5>
                  </div>
                  <p className="text-normal">{comment.message}</p>
                </div>
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ShowChallengeComments;
