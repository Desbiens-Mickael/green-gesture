import "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SingleGroup from "./screens/SingleGroup";
import * as SecureStore from "expo-secure-store";
import { useLogoutMutation } from "./gql/generated/schema";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerComponent = ({ navigation }: { navigation: any }) => {
  const [logout] = useLogoutMutation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Déconnexion"
            onPress={async () => {
              try {
                await SecureStore.deleteItemAsync("userToken");
                await logout();
                navigation.navigate("Login");
              } catch (err) {
                console.error("err", err);
              } finally {
                client.resetStore();
              }
            }}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen
            name="Drawer"
            component={DrawerComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen name="SingleGroup" component={SingleGroup} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
