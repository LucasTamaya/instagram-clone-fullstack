import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://graphql-instagram-clone.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apolloClient;
