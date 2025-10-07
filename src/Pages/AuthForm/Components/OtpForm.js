import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const OtpForm = ({ setMode }) => {
    const OTP_LENGTH = 6;
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState("");
    // Countdown timer effect
    useEffect(() => {
        if (timer === 0)
            return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);
    // Handle OTP input changes
    const handleChange = (value, index) => {
        var _a;
        if (!/^\d?$/.test(value))
            return; // Only numeric digits
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        if (value && index < OTP_LENGTH - 1) {
            (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    // Handle backspace navigation
    const handleKeyDown = (e, index) => {
        var _a;
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    // Submit OTP form
    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== OTP_LENGTH) {
            setError("Please enter the full OTP.");
            return;
        }
        setError("");
        console.log("OTP Verified:", enteredOtp);
        alert("OTP Verified Successfully!");
        setMode("login");
    };
    // Resend OTP
    const handleResend = () => {
        setOtp(Array(OTP_LENGTH).fill(""));
        setTimer(60);
        alert("OTP Resent!");
        // TODO: Add actual resend logic (e.g., API call)
    };
    return (_jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Enter OTP" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("div", { className: "flex justify-center gap-2", children: otp.map((digit, index) => (_jsx("input", { ref: (el) => (inputRefs.current[index] = el), type: "text", inputMode: "numeric", maxLength: 1, value: digit, onChange: (e) => handleChange(e.target.value, index), onKeyDown: (e) => handleKeyDown(e, index), className: "w-10 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-orange-300" }, index))) }), error && _jsx("p", { className: "text-red-500 text-sm text-center", children: error }), _jsx("button", { type: "submit", className: "w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition", children: "Verify OTP" })] }), _jsx("div", { className: "text-center mt-4 text-sm", children: timer > 0 ? (_jsxs("p", { className: "text-gray-600", children: ["Resend OTP in ", timer, "s"] })) : (_jsx("button", { type: "button", onClick: handleResend, className: "text-orange-500 hover:underline", children: "Resend OTP" })) }), _jsx("div", { className: "text-center mt-2 text-sm", children: _jsx("button", { type: "button", onClick: () => setMode("login"), className: "text-orange-500 hover:underline", children: "Back to Login" }) })] }));
};
export default OtpForm;
