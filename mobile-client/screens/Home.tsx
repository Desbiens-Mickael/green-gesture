import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Group, useGetUserGroupsQuery } from "../gql/generated/schema";
import { GroupListItem } from "../components/GroupListItem";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Home() {
  const { currentUser } = useCurrentUser();

  const { loading: loadingGroups, data } = useGetUserGroupsQuery();
  const groups = data?.getUserGroups || [];
  const reversedGroups = [...groups].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>
        Bienvenue, {currentUser?.firstName} {currentUser?.lastName} ! 👋
      </Text>
      <FlatList
        data={reversedGroups}
        refreshing={loadingGroups}
        renderItem={({ item }) => <GroupListItem group={item as Group} />}
        style={{ width: "90%" }}
        contentContainerStyle={{
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
    alignItems: "center",
    flex: 1,
    width: "100%",
    marginTop: 30,
    paddingBottom: 60,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
