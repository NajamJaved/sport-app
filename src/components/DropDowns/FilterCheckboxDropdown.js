import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import RatingStars from "../Rating-stars/RatingStars";
import StatusIndicator from "../StatusIndicator";
const FilterCheckboxDropdown = ({ options, selected = [], onChange = () => { }, style, }) => {
    const handleCheckboxChange = (id) => {
        const updated = selected.includes(id)
            ? selected.filter((val) => val !== id)
            : [...selected, id];
        onChange(updated);
    };
    return (_jsx("div", { className: `flex flex-col gap-2 w-[220px] bg-white rounded-md px-2 py-3 shadow-md border border-gray-200  ${style}`, children: options.map((opt) => {
            const isChecked = selected.includes(opt.id);
            return (_jsxs("button", { onClick: (e) => {
                    e.stopPropagation();
                    handleCheckboxChange(opt.id);
                }, type: "button", className: "flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-left w-full cursor-pointer", children: [_jsx("div", { className: `w-5 h-5 border rounded-sm flex items-center justify-center shrink-0 ${isChecked ? "bg-[#F27B34] border-[#F27B34]" : "border-[#AFAFAF]"}`, children: isChecked && _jsx(Check, { size: 12, className: "text-white" }) }), opt.iconType === "stars" && typeof opt.value === "number" ? (_jsx(RatingStars, { value: opt.value, isDisabled: true })) : opt.iconType === "radio" ? (_jsx("div", { className: "w-3 h-3 rounded-full border-4 shrink-0", style: { borderColor: opt.color || "#ccc" } })) : opt.iconType === "priority" ? (_jsx(StatusIndicator, { containerStyle: `${opt.priorityColor || "bg-gray-300"} size-4 rounded-full flex justify-center items-center`, indicatorStyle: "bg-white size-2 rounded-full" })) : null, opt.label && (_jsx("span", { className: "text-sm text-[#000000] font-medium", children: opt.label }))] }, opt.id));
        }) }));
};
export default FilterCheckboxDropdown;
