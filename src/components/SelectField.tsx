import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CaretDown } from "@/global/icons";
interface Option {
  value: string;
  label: string;
}
interface SelectFieldProps {
  label?: string;
  name?: string;
  options?: Option[];
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  imageSrc?: string;
  styleSelect: string;
  register?: UseFormRegister<any>; 
  required?:boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options = [],
  defaultValue,
  onChange,
  imageSrc = false,
  styleSelect,
  register,
  required
}) => {
  return (
    <div className="w-full ">
      <div>
      <label htmlFor={name} className="block text-sm text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 w-3 h-3 inline-block">*</span>}
      </label>
      </div>
      <div className="relative">
        <select
          id={name}
          {...(register && register(name))}
          className={`remove-select-arrow cursor-pointer border border-[#AFAFAF] ${styleSelect}`}
          onChange={onChange}
        >
          <option value="" disabled hidden>
            {defaultValue || "Select an option"}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {imageSrc && (
          <img
            src={CaretDown}
            alt="icon"
            className="w-[20px] h-[20px] absolute top-[13px] right-[15px]"
          />
        )}
      </div>
    </div>
  );
};

export default SelectField;
