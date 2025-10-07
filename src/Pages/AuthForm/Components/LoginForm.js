import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
const LoginForm = ({ setMode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        alert("Logged in!");
        navigate("/main");
    };
    return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), _jsx(CommonButton, { label: "Login", onClick: (e) => { }, buttonContainerStyle: "w-full", buttonTextStyle: "w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition" })] }), _jsxs("div", { className: "text-center mt-4 space-y-2 text-sm", children: [_jsxs("p", { children: ["Don\u2019t have an account?", " ", _jsx("button", { type: "button", onClick: () => setMode("signup"), className: "text-orange-500 hover:underline", children: "Sign Up" })] }), _jsx("p", { children: _jsx("button", { type: "button", onClick: () => setMode("forgot"), className: "text-orange-500 hover:underline", children: "Forgot Password?" }) })] })] }));
};
export default LoginForm;
