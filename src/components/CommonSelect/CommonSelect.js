import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThemeStore } from "@src/store/ThemeStore";
import { ReactSVG } from "react-svg";
const CommonSelect = ({ label, value, onChange, required = false, options, iconLabel, className = "", labelClassName = "", selectClassName = "", iconLight, iconDark, placeholder = "Select an option", }) => {
    const { theme } = useThemeStore();
    const Icon = theme === "dark" ? iconDark : iconLight;
    return (_jsxs("div", { className: `relative w-full flex flex-col ${className}`, children: [_jsxs("label", { className: `flex gap-1 items-center text-[14px] text-start font-medium mb-1 text-[var(--primary-color)] ${labelClassName}`, children: [label, " ", required && _jsx("span", { className: "text-[#7F56D9]", children: "*" }), " ", _jsx(ReactSVG, { src: iconLabel })] }), _jsxs("div", { className: "relative", children: [_jsxs("select", { value: value, onChange: onChange, required: required, className: `w-full h-[54px] rounded-[8px] border border-[#B1B1B133] dark:border-[#B1B1B133] bg-[#FFFFFFCC] dark:bg-[#FFFFFF08] px-4 pr-10 text-[var(--primary-color)] outline-none appearance-none ${selectClassName}`, children: [_jsx("option", { value: "", disabled: true, children: placeholder }), options.map((opt) => (_jsx("option", { value: opt.value, className: "text-black", children: opt.label }, opt.value)))] }), _jsx("div", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", children: typeof Icon === "string" ? (_jsx("img", { src: Icon, alt: "select icon", className: "w-[18px]" })) : (_jsx(Icon, { className: " fill-current text-[var(--primary-color)] w-[18px] h-[18px]" })) })] })] }));
};
export default CommonSelect;
