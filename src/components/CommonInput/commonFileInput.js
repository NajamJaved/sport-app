import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CommonFileInput = ({ onChange, accept = "*", label, icon, className = "", inputId = "file-upload", imgclassName = "", wholeClass = "" }) => {
    return (_jsx("div", { className: `${wholeClass}`, children: _jsxs("label", { htmlFor: inputId, className: `cursor-pointer inline-flex items-center justify-center ${className}`, children: [_jsx("input", { id: inputId, type: "file", accept: accept, onChange: onChange, className: "hidden" }), icon ? (typeof icon === "string" ? (_jsx("img", { src: icon, alt: "upload", className: `w-[65px] h-[65px] ${imgclassName}` })) : (icon)) : (_jsx("span", { children: label || "Upload" }))] }) }));
};
export default CommonFileInput;
