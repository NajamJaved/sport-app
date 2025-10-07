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
import { ReactSVG } from "react-svg";
const Checkbox = (_a) => {
    var { id, label } = _a, rest = __rest(_a, ["id", "label"]);
    return (_jsxs("div", { className: "flex items-center", children: [_jsx("input", Object.assign({ id: id, type: "checkbox", className: "w-5 h-5 cursor-pointer" }, rest)), _jsx("label", { htmlFor: id, className: "w-full py-3 ms-2 text-sm text-gray-90", children: label })] }));
};
const CustomCheckBox = ({ un_checked, checked, isChecked, onClick, }) => {
    return (_jsx(ReactSVG, { src: isChecked ? checked !== null && checked !== void 0 ? checked : "" : un_checked !== null && un_checked !== void 0 ? un_checked : "", onClick: onClick, className: "hover:bg-[#F27B34]/20 p-0.5 rounded-md cursor-pointer duration-200 w-5 h-5" }));
};
export { Checkbox, CustomCheckBox };
