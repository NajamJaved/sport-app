import { FC } from "react";

type DropdownItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type ReusableDropdownProps = {
  items: DropdownItem[];
  showIcons?: boolean;
  containerClass?: string;
};

const ReusableDropdown: FC<ReusableDropdownProps> = ({
  items,
  showIcons = true,
  containerClass,
}) => {
  return (
    <div
      className={`rounded-lg bg-white shadow-md px-2 py-3 ${containerClass}`}
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-gray-100 transition"
        >
          {showIcons && item.icon && (
            <span className="w-5 h-5 text-gray-600">
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt="icon" className="w-[24px] h-[24px" />
              ) : (
                item.icon
              )}
            </span>
          )}

          <span className="text-sm font-medium text-[#252525] cursor-pointer">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ReusableDropdown;
