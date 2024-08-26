import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  EcoAction,
  useGetMaxValidationPointsQuery,
  useGetUserEcoActionQuery,
} from "../gql/generated/schema";
import Validation from "./Validation";
import ValidationDetails from "./ValidationDetails";

interface EcoActionListItemProps {
  ecoAction: EcoAction;
  groupId: number;
  challengeStartDate: number;
  challengeEndDate: number;
}

export const EcoActionListItem = ({
  ecoAction,
  groupId,
  challengeStartDate,
  challengeEndDate,
}: EcoActionListItemProps) => {
  const { data, loading, refetch } = useGetUserEcoActionQuery({
    variables: { groupId, ecoActionId: ecoAction.id },
  });
  const userEcoAction = data?.getUserEcoAction;

  const { data: maxPointsData, loading: maxPointsLoading } =
    useGetMaxValidationPointsQuery({
      variables: { ecoActionId: ecoAction.id },
    });
  const maxPoints = maxPointsData?.getMaxValidationPoints;

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.ecoActionName}>{ecoAction.name}</Text>
        <Text style={styles.points}>
          {userEcoAction !== null &&
            userEcoAction !== undefined &&
            `${userEcoAction?.points} / ${maxPoints?.points}`}{" "}
          {userEcoAction?.points ? "points" : "0 points"}
        </Text>
      </View>
      <Text style={styles.ecoActionDescription}>{ecoAction.description}</Text>
      <View style={styles.cardFooter}>
        {userEcoAction === undefined &&
          new Date(challengeEndDate).getTime() > new Date().getTime() &&
          new Date(challengeStartDate).getTime() < new Date().getTime() && (
            <Validation
              ecoActionId={ecoAction.id}
              groupId={groupId}
              refetchParent={refetch}
            />
          )}
        {/* MA VALIDATION */}
        {userEcoAction !== undefined && (
          <ValidationDetails groupId={groupId} ecoActionId={ecoAction.id} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ecoActionName: {
    fontSize: 20,
    color: "white",
  },
  points: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  ecoActionDescription: {
    fontSize: 15,
    color: "white",
  },
  cardFooter: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
});
