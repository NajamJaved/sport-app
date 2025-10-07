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
const RadioButton = (_a) => {
    var { id, name, label } = _a, rest = __rest(_a, ["id", "name", "label"]);
    return (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx("input", Object.assign({ id: id, name: name, type: "radio", className: "" }, rest)), _jsx("label", { htmlFor: id, className: "w-full py-1 ms-2 text-sm font-medium text-gray-900", children: label })] }));
};
const CustomRadio = ({ containerStyle, indicatorStyle, }) => {
    return (_jsx("div", { className: `${containerStyle}`, children: _jsx("div", { className: `${indicatorStyle}` }) }));
};
export default RadioButton;
export { CustomRadio };
