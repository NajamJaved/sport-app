var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { ReactSVG } from "react-svg";
const CommonInputWOImg = forwardRef((_a, ref) => {
    var { type, label, value, onChange, onBlur, placeholder, className, error, isTextArea, rows = 4, disabled, inputClassName, required, IsImg, imgSrc, imgLeft, iconLabel, onImgClick, handleAddField, labelClass, showCharCount = true } = _a, // Default value is `true`
    rest = __rest(_a, ["type", "label", "value", "onChange", "onBlur", "placeholder", "className", "error", "isTextArea", "rows", "disabled", "inputClassName", "required", "IsImg", "imgSrc", "imgLeft", "iconLabel", "onImgClick", "handleAddField", "labelClass", "showCharCount"]);
    const [inputLength, setInputLength] = useState(value ? (typeof value === 'string' ? value.length : String(value).length) : 0);
    const baseStyle = "form-input shadow-[0px_1px_2px0px#0A0D120D] focus:outline-1";
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputLength(newValue.length);
        if (onChange)
            onChange(e);
    };
    return (_jsxs("div", { className: `flex flex-col w-full mb-3 ${className}`, children: [label && (_jsxs("label", { className: `flex gap-1 items-center text-[14px] font-medium text-[var(--primary-text-color)] mb-2 ${labelClass}`, children: [label, " ", required && _jsx("span", { className: "text-[#7F56D9] inline-block", children: "*" }), _jsx(ReactSVG, { src: iconLabel })] })), isTextArea ? (_jsxs("div", { className: "relative", children: [_jsx("textarea", Object.assign({ ref: ref, rows: rows, placeholder: placeholder, onChange: handleChange, onBlur: onBlur, value: value, disabled: disabled, maxLength: 500, className: `w-full border border-[#D5D7DA] px-2 py-3 rounded-[8px] outline-none ${baseStyle} ${inputClassName}` }, rest)), showCharCount && (_jsxs("div", { className: "absolute right-2 -bottom-4 text-sm text-gray-500", children: [inputLength, "/", 500] }))] })) : (_jsxs("div", { className: "relative", children: [IsImg && (_jsx("img", { className: `cursor-pointer absolute ${imgLeft ? "left-3" : "right-3"} top-[50%] -translate-y-1/2`, src: imgSrc, onClick: onImgClick })), _jsx("input", Object.assign({ ref: ref, type: type, placeholder: placeholder, onChange: handleChange, onBlur: onBlur, value: value, disabled: disabled, className: `w-full border border-[#B1B1B133] px-2 py-3 rounded-lg bg-[var(--bginputwhite-Black)] outline-none ${baseStyle} ${inputClassName} ${imgLeft ? "!ps-9" : ""}`, onKeyDown: (e) => e.key === "Enter" && (handleAddField === null || handleAddField === void 0 ? void 0 : handleAddField(e)) }, rest))] })), error && _jsx("span", { className: "text-sm text-red-500 mt-1", children: error })] }));
});
export default CommonInputWOImg;
