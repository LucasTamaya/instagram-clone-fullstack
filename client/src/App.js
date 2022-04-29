import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // a modifier pour pointer vers le serveur keroku
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
