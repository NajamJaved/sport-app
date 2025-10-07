import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LinkTextButton from "../../../components/Buttons/LinkTextButton";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
const SignupForm = ({ setMode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    // Password must be at least 8 characters, include one uppercase letter,
    // one number, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        console.log("Signup:", { email, password });
        alert("Signed up successfully!");
        setMode("login");
    };
    const handleGoogleSignup = () => {
        alert("Google Sign Up triggered (to be integrated with backend).");
        // TODO: Integrate with Firebase/Auth provider
    };
    return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Sign Up" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Confirm Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300" })] }), error && _jsx("p", { className: "text-red-500 text-sm", children: error }), _jsx(PrimaryButton, { btnText: "Sign Up", btnClass: "bg-orange-500 text-white py-2 hover:bg-orange-600 transition", btnTextClass: "text-sm font-medium", type: "submit" })] }), _jsxs("div", { className: "flex items-center my-4", children: [_jsx("hr", { className: "flex-grow border-gray-300" }), _jsx("span", { className: "px-2 text-gray-500 text-sm", children: "or" }), _jsx("hr", { className: "flex-grow border-gray-300" })] }), _jsxs("button", { type: "button", onClick: handleGoogleSignup, className: "w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition", children: [_jsx("img", { src: "https://www.svgrepo.com/show/475656/google-color.svg", alt: "Google", className: "w-5 h-5" }), "Sign up with Google"] }), _jsxs("div", { className: "text-center mt-4 text-sm", children: ["Already have an account?", " ", _jsx(LinkTextButton, { btnText: " Login", btnClass: "text-orange-500 hover:underline w-auto", btnTextClass: "text-sm font-medium", type: "submit", onClick: () => setMode("login") })] })] }));
};
export default SignupForm;
