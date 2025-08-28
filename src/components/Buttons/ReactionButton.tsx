import { CommonButtonType } from "@/global/@Types/ButtonTypes";
import { FC } from "react";
import { ReactSVG } from "react-svg";

const CommonButton: FC<CommonButtonType> = ({
  left_icon,
  right_icon,
  label,
  onClick,
  buttonContainerStyle,
  buttonTextStyle,
  leftIconStyle,
  rightIconStyle,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`cursor-pointer ${buttonContainerStyle}`}
    >
      {left_icon && <ReactSVG src={left_icon} className={`${leftIconStyle}`} />}
      <button className={`cursor-pointer ${buttonTextStyle}`}>{label}</button>
      {right_icon && (
        <ReactSVG src={right_icon} className={`${rightIconStyle}`} />
      )}
    </div>
  );
};

export default CommonButton;
