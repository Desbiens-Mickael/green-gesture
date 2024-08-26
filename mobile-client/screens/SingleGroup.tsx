import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { EcoAction, useGetGroupQuery } from "../gql/generated/schema";
import { EcoActionListItem } from "../components/EcoActionListItem";
import DisplayDate from "../components/DisplayDate";

interface Props {
  route: any;
}

export default function SingleGroup({ route }: Props) {
  const groupId = route.params.id;
  const { data: challengeData, loading: groupLoading } = useGetGroupQuery({
    variables: { groupId: +groupId },
  });
  const challenge = challengeData?.getGroup;

  return (
    <View style={styles.container}>
      <Text style={styles.challengeTitle}>{challenge?.challengeName}</Text>
      <View style={styles.challengeInfos}>
        <Text style={styles.basicText}>
          Créé par{" "}
          <Text style={styles.basicBold}>
            {challenge?.author.firstName} {challenge?.author.lastName}
          </Text>
        </Text>
        <DisplayDate
          startDate={challenge?.startDate}
          endDate={challenge?.endDate}
        />
      </View>
      <FlatList
        data={challenge?.ecoActions}
        refreshing={groupLoading}
        renderItem={({ item: ecoAction }) => (
          <EcoActionListItem
            ecoAction={ecoAction as EcoAction}
            groupId={+groupId}
            challengeStartDate={challenge?.startDate}
            challengeEndDate={challenge?.endDate}
          />
        )}
        contentContainerStyle={{
          marginTop: 30,
          width: "100%",
          gap: 30,
        }}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Pas de groupes...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    width: "100%",
  },
  challengeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
  },
  challengeInfos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  basicText: {
    fontSize: 18,
  },
  basicBold: {
    fontWeight: "bold",
  },
});
