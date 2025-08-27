import React from "react";
import { Check } from "lucide-react";
import RatingStars from "../Rating-stars/RatingStars";
import StatusIndicator from "../StatusIndicator";
export interface FilterOption {
  id: string;
  label?: string;
  value: number | string;
  iconType?: "stars" | "radio" | "default" | "priority";
  priorityColor?: string;
  color?: string;
  style: string;
}
interface FilterCheckboxDropdownProps {
  options: FilterOption[];
  selected?: (string | number)[];
  onChange?: (selected: (string | number)[]) => void;
  style?: string;
}

const FilterCheckboxDropdown: React.FC<FilterCheckboxDropdownProps> = ({
  options,
  selected = [],
  onChange = () => { },
  style,
}) => {
  const handleCheckboxChange = (id: string | number) => {
    const updated = selected.includes(id)
      ? selected.filter((val) => val !== id)
      : [...selected, id];
    onChange(updated);
  };

  return (
    <div className={`flex flex-col gap-2 w-[220px] bg-white rounded-md px-2 py-3 shadow-md border border-gray-200  ${style}`}>
      {options.map((opt) => {
        const isChecked = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange(opt.id);
            }}
            type="button"
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-left w-full cursor-pointer"
          >
            <div
              className={`w-5 h-5 border rounded-sm flex items-center justify-center shrink-0 ${isChecked ? "bg-[#F27B34] border-[#F27B34]" : "border-[#AFAFAF]"
                }`}
            >
              {isChecked && <Check size={12} className="text-white" />}
            </div>

            {opt.iconType === "stars" && typeof opt.value === "number" ? (
              <RatingStars value={opt.value} isDisabled={true} />
            ) : opt.iconType === "radio" ? (
              <div
                className="w-3 h-3 rounded-full border-4 shrink-0"
                style={{ borderColor: opt.color || "#ccc" }}
              />
            ) : opt.iconType === "priority" ? (
              <StatusIndicator
                containerStyle={`${opt.priorityColor || "bg-gray-300"
                  } size-4 rounded-full flex justify-center items-center`}
                indicatorStyle="bg-white size-2 rounded-full"
              />
            ) : null}

            {opt.label && (
              <span className="text-sm text-[#000000] font-medium">
                {opt.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterCheckboxDropdown;
