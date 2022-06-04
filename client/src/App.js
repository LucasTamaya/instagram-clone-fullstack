import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import apolloClient from "./helpers/apolloClient";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddPost from "./components/AddPost/AddPost";
import MyPhotos from "./components/MyPhotos/MyPhotos";
import ChangeUsername from "./components/ChangeUsername/ChangeUsername";
import ChangePassword from "./components/ChangePassword/ChangePassword";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/my-photos" element={<MyPhotos />} />
        <Route path="/change-username" element={<ChangeUsername />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
