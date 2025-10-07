import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import OtpForm from "./Components/OtpForm";
const AuthForm = () => {
    const [mode, setMode] = useState("login");
    return (_jsxs("div", { className: "min-h-screen flex flex-col justify-center items-center bg-gray-100 pb-10 px-4 relative", children: [_jsx("h2", { className: "text-3xl font-bold text-orange-500 text-center mb-6", children: "Sport App" }), _jsxs("div", { className: "w-full max-w-md bg-white shadow-lg rounded-2xl p-8", children: [mode === "login" && _jsx(LoginForm, { setMode: setMode }), mode === "signup" && _jsx(SignupForm, { setMode: setMode }), mode === "forgot" && _jsx(ForgotPasswordForm, { setMode: setMode }), mode === "otp" && _jsx(OtpForm, { setMode: setMode })] }), _jsx("div", { className: "fixed bottom-2 right-4 text-xs text-gray-400", children: "Version 1.0.0" })] }));
};
export default AuthForm;
