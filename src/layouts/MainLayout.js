import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import MainTopBar from "@/components/MainTopBar";
const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(MainTopBar, {}), _jsx("main", { className: "flex-1 px-4 py-6", children: children })] }));
};
export default MainLayout;
