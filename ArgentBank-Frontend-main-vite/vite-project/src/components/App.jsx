//Début code Johan

//Contient la/les routes des pages "home", "sign in" et "user" (react router)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Footer from "./Footer";
import SignIn from "../components/SignIn";
import User from "../components/User";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/User" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

//Fin code Johan
