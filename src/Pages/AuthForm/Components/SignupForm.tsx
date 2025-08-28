import { useState } from "react";
import { AuthMode } from "../AuthForm";
import LinkTextButton from "../../../components/Buttons/LinkTextButton";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

interface Props {
    setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

const SignupForm = ({ setMode }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Password must be at least 8 characters, include one uppercase letter,
    // one number, and one special character
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character."
            );
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

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

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

                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <PrimaryButton
                    btnText="Sign Up"
                    btnClass="bg-orange-500 text-white py-2 hover:bg-orange-600 transition"
                    btnTextClass="text-sm font-medium"
                    type="submit"
                />

            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Signup */}
            <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Sign up with Google
            </button>

            {/* Switch to Login */}
            <div className="text-center mt-4 text-sm">
                Already have an account?{" "}

                <LinkTextButton
                    btnText=" Login"
                    btnClass="text-orange-500 hover:underline w-auto"
                    btnTextClass="text-sm font-medium"
                    type="submit"
                    onClick={() => setMode("login")}
                />

            </div>
        </div>
    );
};

export default SignupForm;
