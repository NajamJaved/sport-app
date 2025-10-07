import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const ForgotPasswordForm = ({ setMode }) => {
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Forgot password:", email);
        alert("Password reset link sent!");
        setMode("otp"); // Proceed to OTP verification form
    };
    return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Forgot Password" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), _jsx("button", { type: "submit", className: "w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition", children: "Send Reset Link" })] }), _jsxs("div", { className: "text-center mt-4 text-sm", children: ["Remembered your password?", " ", _jsx("button", { type: "button", onClick: () => setMode("login"), className: "text-orange-500 hover:underline", children: "Back to Login" })] })] }));
};
export default ForgotPasswordForm;
