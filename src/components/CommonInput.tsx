import React from "react";
import { CommonInputTypes } from "@/global/@Types/InputTypes";
const CommonInput: React.FC<CommonInputTypes> = ({
  type,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  error,
  isTextArea,
  rows = 4,
  disabled,
  inputClassName,
  required,
  IsImg,
  imgSrc,
  imgLeft,
  onImgClick,
  handleAddField,
  labelClass
}) => {
  const baseStyle =
    "form-input shadow-[0px_1px_2px0px#0A0D120D] focus:outline-1  ";

  return (
    <div className={`flex flex-col w-full mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className={`form-label ${labelClass} `}>
          {label}{" "}
          {required && (
            <span className="text-red-500 w-3 h-3 inline-block">*</span>
          )}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`${baseStyle} ${inputClassName} ${IsImg ? (imgLeft ? "pl-10" : "pr-10") : ""
            }`}
        />
      ) : (
        <div className="relative">
          {IsImg ? (
            <img
              className={`cursor-pointer absolute ${imgLeft ? "left-3" : "right-3"
                } top-[50%] -translate-y-1/2`}
              src={imgSrc}
              onClick={onImgClick}
            />
          ) : (
            ""
          )}
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full ${baseStyle} ${inputClassName} ${imgLeft == true ? "!ps-9" : ""
              }`}
            onKeyDown={(e) => e.key == "Enter" && handleAddField(e)}
          />

        </div>
      )}

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default CommonInput;
