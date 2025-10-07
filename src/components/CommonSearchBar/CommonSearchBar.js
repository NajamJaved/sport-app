import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchDark, searchLight } from "../../global/images";
const CommonSearchBar = ({ placeholder, theme, value, onChange }) => {
    return (_jsxs("div", { className: "relative mx-auto ", children: [_jsx("input", { required: true, placeholder: placeholder, className: "w-full h-[46px] rounded-full bg-transparent pl-4 pr-10 text-[var(--primary-color)] outline-none", style: {
                    border: theme === "dark" ? "1px solid #FFFFFF66" : "1px solid #25252566",
                }, type: "text", value: value, onChange: onChange }), _jsx("span", { className: "absolute inset-y-0 right-0 flex items-center pr-5", children: _jsx("img", { src: theme === "dark" ? searchLight : SearchDark, alt: "search", className: "w-[16px] h-[16px]" }) })] }));
};
export default CommonSearchBar;
