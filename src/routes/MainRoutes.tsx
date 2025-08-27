import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "../Pages/AuthForm/AuthForm";
import MainHeader from "../Pages/TopBar/MainTopBar";



const MainRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/main" element={<MainHeader />} />
      </Routes>

    </BrowserRouter>
  );
};

export default MainRoutes;
