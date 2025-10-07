import { useThemeStore } from "@src/store/ThemeStore";
import React from "react";
import { ReactSVG } from "react-svg";

interface CommonInputProps {
    type: string;
    placeholder: string;
    label?: string;
    iconLight?: string;
    iconDark?: string;
    iconLabel?: string;
    inputStyle?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({
    type,
    placeholder,
    label,
    iconLight,
    iconDark,
    iconLabel,
    required,
    inputStyle,
    value,
    onChange,
}) => {
    const { theme } = useThemeStore();
    const darkTheme = theme === "dark";
    const lightTheme = theme === "light";

    const hasIcon = !!(iconLight || iconDark);

    return (
        <div className="w-full">
            {label && (
                <label className="flex items-center gap-1 mb-2 text-sm font-medium text-[var(--primary-color)]">
                    {label} {required && <span className="text-[#7F56D9]">*</span>}{" "}
                    {iconLabel && <ReactSVG src={iconLabel} className="w-4 h-4" />}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-[54px] rounded-[50px] border border-[#B1B1B133] 
                        dark:border-[#B1B1B133] bg-[var(--bginputwhite-Black)] 
                        ${hasIcon ? "pl-12" : "pl-4"} ${inputStyle} text-[var(--primary-color)] outline-none`}
                />

                {/* Light icon */}
                {lightTheme && iconLight && (
                    <img
                        src={iconLight}
                        alt="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                )}

                {/* Dark icon */}
                {darkTheme && iconDark && (
                    <img
                        src={iconDark}
                        alt="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                )}
            </div>
        </div>
    );
};

export default CommonInput;
