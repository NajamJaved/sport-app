import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sizeMap = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
};
const Modal = ({ isOpen, onClose, children, title, size = "lg", className }) => {
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-20", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-40", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": title !== null && title !== void 0 ? title : "Modal", className: `relative z-50 w-full ${sizeMap[size]} mx-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-auto ${className !== null && className !== void 0 ? className : ""}`, children: [_jsx("div", { className: "flex justify-end p-3 border-b", children: _jsx("button", { onClick: onClose, className: "text-gray-600 hover:text-gray-900 text-xl", "aria-label": "Close", children: "\u2715" }) }), _jsx("div", { className: "p-4", children: children })] })] }));
};
export default Modal;
