import React, { ReactNode } from "react";

interface CommonFileInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    label?: string;
    icon?: string | ReactNode;
    className?: string;
    inputId?: string;
    imgclassName?: string;
    wholeClass?: string;
}

const CommonFileInput: React.FC<CommonFileInputProps> = ({
    onChange,
    accept = "*",
    label,
    icon,
    className = "",
    inputId = "file-upload",
    imgclassName = "",
    wholeClass = ""
}) => {
    return (
        <div className={`${wholeClass}`}>
            <label
                htmlFor={inputId}
                className={`cursor-pointer inline-flex items-center justify-center ${className}`}
            >
                <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
                {icon ? (
                    typeof icon === "string" ? (
                        <img src={icon} alt="upload" className={`w-[65px] h-[65px] ${imgclassName}`} />
                    ) : (
                        icon
                    )
                ) : (
                    <span>{label || "Upload"}</span>
                )}
            </label>
        </div>
    );
};

export default CommonFileInput;
