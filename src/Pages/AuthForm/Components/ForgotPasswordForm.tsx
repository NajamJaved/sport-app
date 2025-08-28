import { useState } from "react";
import { AuthMode } from "../AuthForm";

interface Props {
    setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

const ForgotPasswordForm = ({ setMode }: Props) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Forgot password:", email);
        alert("Password reset link sent!");
        setMode("otp"); // Proceed to OTP verification form
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

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

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Send Reset Link
                </button>
            </form>

            <div className="text-center mt-4 text-sm">
                Remembered your password?{" "}
                <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-orange-500 hover:underline"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
