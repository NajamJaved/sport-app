import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "../Pages/AuthForm/AuthForm";
import MainHeader from "../Pages/TopBar/MainTopBar";
import MainTopBar from "../Pages/TopBar/MainTopBar";
import ProfilePage from "../Pages/MainPages/ProfilePage";



const MainRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/main" element={<MainTopBar />} />
        <Route path="/Profile" element={<ProfilePage />} />

      </Routes>

    </BrowserRouter>
  );
};

export default MainRoutes;
