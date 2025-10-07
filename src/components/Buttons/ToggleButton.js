import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactSVG } from "react-svg";
const ToggleButton = ({ label, left_icon, right_icon, containerStyle, textStyle, activeToggleStyle, inActiveToggleStyle, toggleIndicatorStyle, switch_toggle, onClick, isActive, }) => {
    return (_jsxs("div", { className: `${containerStyle} cursor-pointer`, onClick: onClick, children: [left_icon && _jsx(ReactSVG, { src: left_icon }), _jsx("p", { className: `${textStyle}`, children: label }), right_icon && _jsx(ReactSVG, { src: right_icon }), switch_toggle && (_jsx("div", { className: `${isActive ? activeToggleStyle : inActiveToggleStyle} relative w-12 h-6 rounded-full transition-all duration-300`, children: _jsx("div", { className: `${toggleIndicatorStyle} absolute top-1 left-1 transition-transform duration-300`, style: {
                        transform: isActive ? "translateX(24px)" : "translateX(0px)",
                    } }) }))] }));
};
export default ToggleButton;
