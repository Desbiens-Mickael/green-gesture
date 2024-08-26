import { useGetCurrentUserQuery } from "../gql/generated/schema";

export const useCurrentUser = () => {
  const {
    data: currentUserData,
    loading,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.getCurrentUser;

  return { currentUser, loading, refetchCurrentUser };
};
