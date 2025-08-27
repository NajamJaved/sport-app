import { useEffect, useRef, useState } from "react";
import { AuthMode } from "../AuthForm";

interface Props {
    setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

const OtpForm = ({ setMode }: Props) => {
    const OTP_LENGTH = 6;
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState("");

    // Countdown timer effect
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Handle OTP input changes
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Only numeric digits
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace navigation
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Submit OTP form
    const handleSubmit = (e: React.FormEvent) => {
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

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el!)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Verify OTP
                </button>
            </form>

            {/* Timer / Resend OTP */}
            <div className="text-center mt-4 text-sm">
                {timer > 0 ? (
                    <p className="text-gray-600">Resend OTP in {timer}s</p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="text-orange-500 hover:underline"
                    >
                        Resend OTP
                    </button>
                )}
            </div>

            {/* Back to Login */}
            <div className="text-center mt-2 text-sm">
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

export default OtpForm;
