import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
const PrimaryAccordion = ({ children, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-full bg-[#f5f5f6] rounded-[4px] cursor-pointer mb-[14px]", children: _jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center flex-row-reverse w-full px-5 py-4 font-medium text-left text-gray-500 rounded-xl  hover:bg-gray-100 gap-3 justify-end", children: [_jsx("span", { className: "text-[14px] text-black font-semibold", children: label }), _jsx("svg", { className: `w-3 h-3 transform  transition-transform ${isOpen ? "rotate-180" : ""}`, fill: "none", viewBox: "0 0 10 6", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { stroke: "black", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5L5 1 1 5" }) })] }) }), isOpen && children] }));
};
export default PrimaryAccordion;
