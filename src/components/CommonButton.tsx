import { useState } from "react";
import { ReactSVG } from "react-svg";

import React from "react";

export type CommonButtonType = {
  left_icon?: string;
  right_icon?: string;
  left_icon_hover?: string;
  left_icon_active?: string;
  label?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  buttonContainerStyle?: string;
  buttonTextStyle?: string;
  leftIconStyle?: string;
  classIconStyle?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  loading?: boolean;
};
const CommonButton: React.FC<CommonButtonType> = ({
  left_icon,
  right_icon,
  left_icon_hover,
  left_icon_active,
  label,
  onClick,
  buttonContainerStyle,
  buttonTextStyle,
  leftIconStyle,
  onMouseEnter,
  onMouseLeave,
  classIconStyle,
  isActive = false,
  disabled,
  loading = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);


  const iconToShow = isActive
    ? left_icon_active || left_icon_hover || left_icon
    : isHovered
      ? left_icon_hover || left_icon
      : left_icon;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!loading) onClick?.(e);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      className={`cursor-pointer flex items-center gap-2 ${buttonContainerStyle}`}
    >
      {/* Left Icon */}
      {left_icon && !loading && (
        <ReactSVG
          src={iconToShow}
          className={`inline-block w-5 h-5 mr-2 ${classIconStyle}`}
        />
      )}

      {/* Button Label */}
      {loading ? (
        <div className={`flex items-center justify-center ${buttonTextStyle}`}>
          <div className=" animate-spin border-4 border-t-4 border-gray-400 w-5 h-5 rounded-full" />
        </div>
      ) : (
        <button className={`cursor-pointer ${buttonTextStyle}`}>{label}</button>
      )}

      {/* Right Icon - Same as left, but flipped */}
      {right_icon && !loading && (
        <ReactSVG
          src={iconToShow}  // Same icon as the left, only flipped if needed
          className={`${leftIconStyle} transform rotate-180`} // Flip the icon for the right side
        />
      )}
    </div>
  );
};

export default CommonButton;
