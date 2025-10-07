import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SearchSvg } from "@/global/icons";
import { ReactSVG } from "react-svg";
const Searchbar = ({ showSearchbar, onSubmit, register, showLeftIcon, showRightIcon, placeholder, containerStyle, }) => {
    return (_jsx(_Fragment, { children: showSearchbar && (_jsxs("form", { onSubmit: onSubmit, className: `flex items-center border border-neutral-300 md:w-[270px] lg:w-[290px] md:h-[41px] md:p-0 p-2 md:mt-0 mt-2 rounded-4 w-full ${containerStyle}`, children: [showLeftIcon && _jsx(ReactSVG, { src: SearchSvg, className: "ms-2" }), _jsx("input", Object.assign({}, (register ? register("search") : {}), { placeholder: placeholder, className: "outline-0 w-full px-3" })), showRightIcon && _jsx(ReactSVG, { src: SearchSvg, className: "me-2" })] })) }));
};
export default Searchbar;
