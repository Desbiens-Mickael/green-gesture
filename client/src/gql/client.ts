import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const API_URI = import.meta.env.VITE_GRAPHQL_API_URL;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: API_URI,
    credentials: "include",
  }),
});

export default client;
