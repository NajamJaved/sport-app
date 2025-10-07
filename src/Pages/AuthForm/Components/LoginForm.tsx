import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthMode } from "../AuthForm";
import CommonButton from "@/components/CommonButton";

interface Props {
    setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

const LoginForm = ({ setMode }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        alert("Logged in!");
        navigate("/main");
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                    />
                </div>

                <CommonButton
                    label="Login"
                    onClick={(e) => { /* form submit handled by onSubmit */ }}
                    buttonContainerStyle="w-full"
                    buttonTextStyle="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                />
            </form>

            {/* Navigation links */}
            <div className="text-center mt-4 space-y-2 text-sm">
                <p>
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-orange-500 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
                <p>
                    <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-orange-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
