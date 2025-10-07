import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactSVG } from "react-svg";
const CommonDropDown = ({ containerStyle, labelStyle, leftIconStyle, rightIconStyle, left_icon, right_icon, label, onClick, }) => {
    return (_jsxs("div", { onClick: (e) => {
            e.stopPropagation();
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }, className: `${containerStyle} cursor-pointer`, children: [left_icon && _jsx(ReactSVG, { src: left_icon, className: `${leftIconStyle}` }), _jsx("p", { className: `${labelStyle}`, children: label }), right_icon && (_jsx(ReactSVG, { src: right_icon, className: `${rightIconStyle}` }))] }));
};
export default CommonDropDown;
