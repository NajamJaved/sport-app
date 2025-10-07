import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ReusableDropdown = ({ items, showIcons = true, containerClass, }) => {
    return (_jsx("div", { className: `rounded-lg bg-white shadow-md px-2 py-3 ${containerClass}`, children: items.map((item, idx) => (_jsxs("button", { onClick: item.onClick, className: "flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-gray-100 transition", children: [showIcons && item.icon && (_jsx("span", { className: "w-5 h-5 text-gray-600", children: typeof item.icon === "string" ? (_jsx("img", { src: item.icon, alt: "icon", className: "w-[24px] h-[24px" })) : (item.icon) })), _jsx("span", { className: "text-sm font-medium text-[#252525] cursor-pointer", children: item.label })] }, idx))) }));
};
export default ReusableDropdown;
