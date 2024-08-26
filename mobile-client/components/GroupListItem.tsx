import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import { Group } from "../gql/generated/schema";

interface GroupListItemProps {
  group: Group;
}

export const GroupListItem = ({ group }: GroupListItemProps) => {
  return (
    <Link
      to={{ screen: "SingleGroup", params: { id: group.id } }}
      style={styles.link}
    >
      <Text style={styles.text}>{group.challengeName}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    display: "flex",
    width: "100%",
    backgroundColor: "green",
    textAlign: "center",
    padding: 10,
  },
  text: {
    color: "white",
  },
});
