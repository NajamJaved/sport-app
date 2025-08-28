import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import OtpForm from "./Components/OtpForm";
import Header from "../TopBar/Header";

export type AuthMode = "login" | "signup" | "forgot" | "otp";

const AuthForm = () => {
    const [mode, setMode] = useState<AuthMode>("login");

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 pb-10 px-4 relative">
            {/* App Title - Outside the Card */}
            <Header />
            <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Sport App</h2>

            {/* Auth Form Card */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                {mode === "login" && <LoginForm setMode={setMode} />}
                {mode === "signup" && <SignupForm setMode={setMode} />}
                {mode === "forgot" && <ForgotPasswordForm setMode={setMode} />}
                {mode === "otp" && <OtpForm setMode={setMode} />}
            </div>

            {/* Version Footer - Fixed to Bottom Right */}
            <div className="fixed bottom-2 right-4 text-xs text-gray-400">
                Version 1.0.0
            </div>
        </div>
    );
};

export default AuthForm;
