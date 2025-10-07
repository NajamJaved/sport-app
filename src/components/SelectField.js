import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown } from "@/global/icons";
const SelectField = ({ label, name, options = [], defaultValue, onChange, imageSrc = false, styleSelect, register, required }) => {
    return (_jsxs("div", { className: "w-full ", children: [_jsx("div", { children: _jsxs("label", { htmlFor: name, className: "block text-sm text-gray-700 mb-1", children: [label, required && _jsx("span", { className: "text-red-500 w-3 h-3 inline-block", children: "*" })] }) }), _jsxs("div", { className: "relative", children: [_jsxs("select", Object.assign({ id: name }, (register && register(name)), { className: `remove-select-arrow cursor-pointer border border-[#AFAFAF] ${styleSelect}`, onChange: onChange, children: [_jsx("option", { value: "", disabled: true, hidden: true, children: defaultValue || "Select an option" }), options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] })), imageSrc && (_jsx("img", { src: CaretDown, alt: "icon", className: "w-[20px] h-[20px] absolute top-[13px] right-[15px]" }))] })] }));
};
export default SelectField;
