import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PrimaryButton } from "../Buttons/PrimaryButton";
const Pagination = ({ totalRecords }) => {
    var _a;
    const totalRecordsLength = Math.max(...totalRecords);
    return (_jsx("div", { className: "flex justify-end", children: _jsxs("div", { className: "flex gap-[12px] w-[263px] items-center justify-end", children: [_jsx(PrimaryButton, { btnText: "Previous", btnClass: "bg-[#1111111A] cursor-pointer !w-fit pt-[3px] pb-[3px] pe-[10px] ps-[10px] !rounded-full text-[#A3A1A1] text-[14px] " }), _jsxs("p", { className: "flex gap-[12px]", children: [(_a = totalRecords === null || totalRecords === void 0 ? void 0 : totalRecords.slice(0, 3)) === null || _a === void 0 ? void 0 : _a.map((record) => (_jsx("span", { className: "cursor-pointer", children: record }))), _jsx("span", { children: "..." }), _jsx("span", { className: "cursor-pointer", children: totalRecordsLength })] }), _jsx(PrimaryButton, { btnText: "Next", btnClass: "bg-[#111111] cursor-pointer !w-fit pt-[3px] pb-[3px] pe-[10px] ps-[10px] !rounded-full text-[#A3A1A1] text-[14px] " })] }) }));
};
export default Pagination;
