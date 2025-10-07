import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactSVG } from "react-svg";
const CommonButton = ({ left_icon, right_icon, label, onClick, buttonContainerStyle, buttonTextStyle, leftIconStyle, rightIconStyle, }) => {
    return (_jsxs("div", { onClick: (e) => {
            e.stopPropagation();
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }, className: `cursor-pointer ${buttonContainerStyle}`, children: [left_icon && _jsx(ReactSVG, { src: left_icon, className: `${leftIconStyle}` }), _jsx("button", { className: `cursor-pointer ${buttonTextStyle}`, children: label }), right_icon && (_jsx(ReactSVG, { src: right_icon, className: `${rightIconStyle}` }))] }));
};
export default CommonButton;
