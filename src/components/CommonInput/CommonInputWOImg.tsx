import React, { forwardRef, useState, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { ReactSVG } from "react-svg";

type CommonInputTypes = {
    type?: string;
    label?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    className?: string;
    error?: string;
    isTextArea?: boolean;
    rows?: number;
    disabled?: boolean;
    inputClassName?: string;
    required?: boolean;
    IsImg?: boolean;
    iconLabel?: string;
    imgSrc?: string;
    imgLeft?: boolean;
    onImgClick?: () => void;
    handleAddField?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    labelClass?: string;
    showCharCount?: boolean; // New prop to conditionally display the character count
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur" | "value" | "type" | "placeholder" | "disabled">
    & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "onBlur" | "value" | "placeholder" | "disabled">;

const CommonInputWOImg = forwardRef<HTMLInputElement | HTMLTextAreaElement, CommonInputTypes>(({
    type,
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
    iconLabel,
    onImgClick,
    handleAddField,
    labelClass,
    showCharCount = true, // Default value is `true`
    ...rest
}, ref) => {
    const [inputLength, setInputLength] = useState(value ? (typeof value === 'string' ? value.length : String(value).length) : 0);

    const baseStyle = "form-input shadow-[0px_1px_2px0px#0A0D120D] focus:outline-1";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInputLength(newValue.length);
        if (onChange) onChange(e);
    };

    return (
        <div className={`flex flex-col w-full mb-3 ${className}`}>
            {label && (
                <label className={`flex gap-1 items-center text-[14px] font-medium text-[var(--primary-text-color)] mb-2 ${labelClass}`}>
                    {label}{" "}
                    {required && <span className="text-[#7F56D9] inline-block">*</span>}
                    <ReactSVG src={iconLabel} />
                </label>
            )}

            {isTextArea ? (
                <div className="relative">
                    <textarea
                        ref={ref}
                        rows={rows}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={disabled}
                        maxLength={500}
                        className={`w-full border border-[#D5D7DA] px-2 py-3 rounded-[8px] outline-none ${baseStyle} ${inputClassName}`}
                        {...rest}
                    />
                    {showCharCount && (
                        <div className="absolute right-2 -bottom-4 text-sm text-gray-500">
                            {inputLength}/{500}
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative">
                    {IsImg && (
                        <img
                            className={`cursor-pointer absolute ${imgLeft ? "left-3" : "right-3"} top-[50%] -translate-y-1/2`}
                            src={imgSrc}
                            onClick={onImgClick}
                        />
                    )}
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={disabled}
                        className={`w-full border border-[#B1B1B133] px-2 py-3 rounded-lg bg-[var(--bginputwhite-Black)] outline-none ${baseStyle} ${inputClassName} ${imgLeft ? "!ps-9" : ""}`}
                        onKeyDown={(e) => e.key === "Enter" && handleAddField?.(e)}
                        {...rest}
                    />
                </div>
            )}

            {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
        </div>
    );
});

export default CommonInputWOImg;
