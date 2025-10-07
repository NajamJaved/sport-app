import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactSVG } from "react-svg";
const ProfileDropDown = ({ imageSource, name, dropDownIcon, onClick, mainStyle, textStyle, }) => {
    return (_jsxs("div", { className: `flex justify-center min-w-[160px] items-center gap-2 ps-8 cursor-pointer ${mainStyle}`, onClick: onClick, children: [_jsx("div", { className: "w-[34px] h-[34px] object-cover", children: _jsx("img", { src: imageSource, alt: imageSource, className: "w-full h-full rounded-full" }) }), _jsx("p", { className: `${textStyle}`, children: name }), _jsx(ReactSVG, { src: dropDownIcon })] }));
};
export default ProfileDropDown;
