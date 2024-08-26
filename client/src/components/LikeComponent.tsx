import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetNumberLikesQuery,
  useIsLikedQuery,
} from "@/gql/generated/schema";
import { Loading } from "@/pages/Loading";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface LikeComponentProps {
  ecoActionId: number;
}

const LikeComponent = ({ ecoActionId }: LikeComponentProps) => {
  const {
    data,
    loading,
    refetch: refetchNumLikes,
  } = useGetNumberLikesQuery({
    variables: { ecoActionId: ecoActionId },
  });
  const likes = data?.getNumberLikes;

  const { data: isLikedData, refetch: refetchIsLiked } = useIsLikedQuery({
    variables: { ecoActionId },
  });
  const isLiked = isLikedData?.isLiked;

  const [CreateLike] = useCreateLikeMutation();
  const [DeleteLike] = useDeleteLikeMutation();

  const handleLike = async () => {
    try {
      await CreateLike({
        variables: {
          ecoActionId,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refetchNumLikes();
      refetchIsLiked();
    }
  };

  const handleDeleteLike = async () => {
    try {
      await DeleteLike({
        variables: {
          ecoActionId,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refetchNumLikes();
      refetchIsLiked();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        className={`p-1 h-6 w-6 hover:bg-red-500 hover:text-white cursor-pointer ${
          isLiked ? "bg-red-500 text-white" : ""
        }`}
        asChild={true}
        variant="ghost"
        onClick={() => {
          isLiked ? handleDeleteLike() : handleLike();
        }}
      >
        <Heart className="" />
      </Button>
      <p className="text-lg">{likes}</p>
    </div>
  );
};

export default LikeComponent;
