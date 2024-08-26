import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const env = Constants.expoConfig?.extra || {};
console.log({ env });

import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: env?.REACT_APP_GRAPHQL_API_URL || "http://localhost:4000",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("userToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  };
});

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: authLink.concat(httpLink),
});

export default client;
