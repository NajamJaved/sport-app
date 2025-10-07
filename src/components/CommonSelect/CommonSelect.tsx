import React from "react";
import { useThemeStore } from "@src/store/ThemeStore";
import { ReactSVG } from "react-svg";

interface CommonSelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    options: { value: string; label: string }[];
    className?: string;
    iconLabel?: string;
    labelClassName?: string;
    selectClassName?: string;
    iconLight?: string | React.FC<React.SVGProps<SVGSVGElement>>;
    iconDark?: string | React.FC<React.SVGProps<SVGSVGElement>>;
    placeholder?: string;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
    label,
    value,
    onChange,
    required = false,
    options,
    iconLabel,
    className = "",
    labelClassName = "",
    selectClassName = "",
    iconLight,
    iconDark,
    placeholder = "Select an option",
}) => {
    const { theme } = useThemeStore();
    const Icon = theme === "dark" ? iconDark : iconLight;

    return (
        <div className={`relative w-full flex flex-col ${className}`}>
            <label className={`flex gap-1 items-center text-[14px] text-start font-medium mb-1 text-[var(--primary-color)] ${labelClassName}`}>
                {label} {required && <span className="text-[#7F56D9]">*</span>} <ReactSVG src={iconLabel} />
            </label>

            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full h-[54px] rounded-[8px] border border-[#B1B1B133] dark:border-[#B1B1B133] bg-[#FFFFFFCC] dark:bg-[#FFFFFF08] px-4 pr-10 text-[var(--primary-color)] outline-none appearance-none ${selectClassName}`}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-black">
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Icon for select */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    {typeof Icon === "string" ? (
                        <img src={Icon} alt="select icon" className="w-[18px]" />
                    ) : (
                        <Icon className=" fill-current text-[var(--primary-color)] w-[18px] h-[18px]" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommonSelect;
