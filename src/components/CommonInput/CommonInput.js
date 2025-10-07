import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThemeStore } from "@src/store/ThemeStore";
import { ReactSVG } from "react-svg";
const CommonInput = ({ type, placeholder, label, iconLight, iconDark, iconLabel, required, inputStyle, value, onChange, }) => {
    const { theme } = useThemeStore();
    const darkTheme = theme === "dark";
    const lightTheme = theme === "light";
    const hasIcon = !!(iconLight || iconDark);
    return (_jsxs("div", { className: "w-full", children: [label && (_jsxs("label", { className: "flex items-center gap-1 mb-2 text-sm font-medium text-[var(--primary-color)]", children: [label, " ", required && _jsx("span", { className: "text-[#7F56D9]", children: "*" }), " ", iconLabel && _jsx(ReactSVG, { src: iconLabel, className: "w-4 h-4" })] })), _jsxs("div", { className: "relative", children: [_jsx("input", { type: type, placeholder: placeholder, value: value, onChange: onChange, className: `w-full h-[54px] rounded-[50px] border border-[#B1B1B133] 
                        dark:border-[#B1B1B133] bg-[var(--bginputwhite-Black)] 
                        ${hasIcon ? "pl-12" : "pl-4"} ${inputStyle} text-[var(--primary-color)] outline-none` }), lightTheme && iconLight && (_jsx("img", { src: iconLight, alt: "icon", className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" })), darkTheme && iconDark && (_jsx("img", { src: iconDark, alt: "icon", className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" }))] })] }));
};
export default CommonInput;
