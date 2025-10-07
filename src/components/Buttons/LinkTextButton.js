import { jsx as _jsx } from "react/jsx-runtime";
const LinkTextButton = ({ content, isLoading, onClick, type = "button", className }) => {
    return (_jsx("button", { type: type, onClick: onClick, className: className, children: isLoading ? _jsx("span", { className: "animate-pulse", children: "Loading..." }) : content }));
};
export default LinkTextButton;
