import { ToggleButtonType } from "@/global/@Types/ButtonTypes";
import { FC } from "react";
import { ReactSVG } from "react-svg";

const ToggleButton: FC<ToggleButtonType> = ({
  label,
  left_icon,
  right_icon,
  containerStyle,
  textStyle,
  activeToggleStyle,
  inActiveToggleStyle,
  toggleIndicatorStyle,
  switch_toggle,
  onClick,
  isActive,
}) => {
  return (
    <div className={`${containerStyle} cursor-pointer`} onClick={onClick}>
      {left_icon && <ReactSVG src={left_icon} />}
      <p className={`${textStyle}`}>{label}</p>
      {right_icon && <ReactSVG src={right_icon} />}
      {switch_toggle && (
        <div
          className={`${isActive ? activeToggleStyle : inActiveToggleStyle} relative w-12 h-6 rounded-full transition-all duration-300`}
        >
          <div
            className={`${toggleIndicatorStyle} absolute top-1 left-1 transition-transform duration-300`}
            style={{
              transform: isActive ? "translateX(24px)" : "translateX(0px)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
