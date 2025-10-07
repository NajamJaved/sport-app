import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Spinner from "../Loader/Spinner";
const PrimaryButton = ({ btnText, btnTextClass, btnClass, img, showImg, imgClass, onClick, linkTo, imgPosition = "left", isLoading = false, type = "button", }) => {
    const imageElement = showImg && _jsx("img", { src: img, className: imgClass, alt: "btn-icon" });
    const textElement = _jsx("span", { className: btnTextClass, children: btnText });
    const content = (_jsx("div", { className: "flex items-center gap-x-1 justify-center", children: imgPosition === "left" ? (_jsxs(_Fragment, { children: [imageElement, textElement] })) : (_jsxs(_Fragment, { children: [textElement, imageElement] })) }));
    if (linkTo) {
        return (_jsx(Link, { to: linkTo, className: `rounded-lg flex items-center justify-center cursor-pointer w-full ${btnClass}`, children: isLoading ? _jsx(Spinner, {}) : content }));
    }
    return (_jsx("button", { className: `rounded-lg flex items-center justify-center cursor-pointer w-full ${btnClass}`, onClick: onClick, type: type, children: isLoading ? _jsx(Spinner, {}) : content }));
};
export default PrimaryButton;
