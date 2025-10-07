import React from "react";
import { SearchDark, searchLight } from "../../global/images";

interface CommonSearchBarProps {
    placeholder: string;
    theme: "light" | "dark";
    value: string;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonSearchBar: React.FC<CommonSearchBarProps> = ({ placeholder, theme, value, onChange }) => {
    return (
        <div className="relative mx-auto ">
            <input
                required
                placeholder={placeholder}
                className="w-full h-[46px] rounded-full bg-transparent pl-4 pr-10 text-[var(--primary-color)] outline-none"
                style={{
                    border: theme === "dark" ? "1px solid #FFFFFF66" : "1px solid #25252566",
                }}
                type="text"
                value={value}
                onChange={onChange}
            />

            {/* Theme-based icon */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-5">
                <img
                    src={theme === "dark" ? searchLight : SearchDark}
                    alt="search"
                    className="w-[16px] h-[16px]"
                />
            </span>
        </div>
    );
};

export default CommonSearchBar;
