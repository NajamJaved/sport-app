import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ReactSVG } from "react-svg";
const CommonButton = ({ left_icon, right_icon, left_icon_hover, left_icon_active, label, onClick, buttonContainerStyle, buttonTextStyle, leftIconStyle, onMouseEnter, onMouseLeave, classIconStyle, isActive = false, disabled, loading = false, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const iconToShow = isActive
        ? left_icon_active || left_icon_hover || left_icon
        : isHovered
            ? left_icon_hover || left_icon
            : left_icon;
    return (_jsxs("div", { onClick: (e) => {
            e.stopPropagation();
            if (!loading)
                onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }, onMouseEnter: () => {
            setIsHovered(true);
            onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter();
        }, onMouseLeave: () => {
            setIsHovered(false);
            onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave();
        }, className: `cursor-pointer flex items-center gap-2 ${buttonContainerStyle}`, children: [left_icon && !loading && (_jsx(ReactSVG, { src: left_icon, className: `inline-block w-5 h-5 mr-2 ${classIconStyle}` })), loading ? (_jsx("div", { className: `flex items-center justify-center ${buttonTextStyle}`, children: _jsx("div", { className: " animate-spin border-4 border-t-4 border-gray-400 w-5 h-5 rounded-full" }) })) : (_jsx("button", { className: `cursor-pointer ${buttonTextStyle}`, children: label })), right_icon && !loading && (_jsx(ReactSVG, { src: right_icon, className: `${leftIconStyle} transform rotate-180` }))] }));
};
export default CommonButton;
