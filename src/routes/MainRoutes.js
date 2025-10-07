import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "../Pages/AuthForm/AuthForm";
import MainTopBar from "../Pages/TopBar/MainTopBar";
import ProfilePage from "../Pages/MainPages/ProfilePage";
const MainRoutes = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AuthForm, {}) }), _jsx(Route, { path: "/main", element: _jsx(MainTopBar, {}) }), _jsx(Route, { path: "/Profile", element: _jsx(ProfilePage, {}) })] }) }));
};
export default MainRoutes;
