import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./landing page/header/header";
import Main from "./landing page/main/main";
import Login from "./login and sign up/login/login";
import SignUp from "./login and sign up/signup/signup";
import Auth from "./login and sign up/auth/authentification";
import ForgetPassword from "./login and sign up/login/forgetpassword.jsx";
import SetNewPassword from "./login and sign up/login/setnewpassword.jsx";
import MainChatt from "./chat-pages/mainchatt.jsx";
import Chatt from "./chat-pages/chatt.jsx";
import Userpage from "./chat-pages/userpage.jsx";
import FindFriends from "./chat-pages/FIndfreinds.jsx";
import Settings from "./chat-pages/settings.jsx";
export default function Rout() {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/authentification" ||
    location.pathname === "/forgetpassword" ||
    location.pathname.startsWith("/set-new-password") ||
    location.pathname.startsWith("/mainchatt") ||
    location.pathname.startsWith("/chatt") ||
    location.pathname.startsWith("/userpage") ||
    location.pathname.startsWith("/findfriends") ||
    location.pathname.startsWith("/settings");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/authentification" element={<Auth />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
        <Route path="/mainchatt" element={<MainChatt />} />
        <Route path="/chatt" element={<Chatt />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/findfriends" element={<FindFriends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
