import { CommonDropDownType } from "@/global/@Types/DropDownTypes";
import { FC } from "react";
import { ReactSVG } from "react-svg";

const CommonDropDown: FC<CommonDropDownType> = ({
  containerStyle,
  labelStyle,
  leftIconStyle,
  rightIconStyle,
  left_icon,
  right_icon,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`${containerStyle} cursor-pointer`}
    >
      {left_icon && <ReactSVG src={left_icon} className={`${leftIconStyle}`} />}
      <p className={`${labelStyle}`}>{label}</p>
      {right_icon && (
        <ReactSVG src={right_icon} className={`${rightIconStyle}`} />
      )}
    </div>
  );
};

export default CommonDropDown;
