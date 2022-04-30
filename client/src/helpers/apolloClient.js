import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql", // a modifier pour pointer vers le serveur keroku
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apolloClient;
