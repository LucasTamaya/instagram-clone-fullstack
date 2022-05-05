import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import apolloClient from "./helpers/apolloClient";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddPost from "./components/AddPost/AddPost";
import MyPhotos from "./components/MyPhotos/MyPhotos";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/my-photos" element={<MyPhotos />} />
      </Routes>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
