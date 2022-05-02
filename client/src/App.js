import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import apolloClient from "./helpers/apolloClient";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddPost from "./components/AddPost/AddPost";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
