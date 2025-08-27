import { ProfileDropDownType } from "@/global/@Types/DropDownTypes";
import { FC } from "react";
import { ReactSVG } from "react-svg";

const ProfileDropDown: FC<ProfileDropDownType> = ({
  imageSource,
  name,
  dropDownIcon,
  onClick,
  mainStyle,
  textStyle,
}) => {
  return (
    <div
      className={`flex justify-center min-w-[160px] items-center gap-2 ps-8 cursor-pointer ${mainStyle}`}
      onClick={onClick}
    >
      <div className="w-[34px] h-[34px] object-cover">
        <img
          src={imageSource}
          alt={imageSource}
          className="w-full h-full rounded-full"
        />
      </div>
      <p className={`${textStyle}`}>{name}</p>
      <ReactSVG src={dropDownIcon} />
    </div>
  );
};

export default ProfileDropDown;
