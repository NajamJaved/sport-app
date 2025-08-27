import CommonButton from "@/components/Buttons/ReactionButton";
import ToggleButton from "@/components/Buttons/ToggleButton";
import CommonDropDown from "@/components/DropDowns/CommonDropDown";
import Searchbar from "@/components/Searchbar";
import { ExplorerLayoutType } from "@/global/@Types/LayoutTypes";
import { PlaceholderText } from "@/global/text";
import { FC } from "react";
import { useForm } from "react-hook-form";

const ExplorerLayout: FC<ExplorerLayoutType> = ({
  children,
  title,
  collapse,
  searchbar,
  containerStyle,
  titleStyle,
  rowBetweenContent,
  rowContentStyle,
  collapseButtonLabel,
  left_icon,
  right_icon,
  onToggle,
  toggleButtonTextStyle,
  sort,
  filter,
  sortIcon,
  filterIcon,
  sortLabel,
  filterLabel,
  buttonList,
  dropdownList,
  searchbarProps,

}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSearch = () => {
    reset();
  };

  return (
    <div className={`${containerStyle}`}>
      <div className={`${rowBetweenContent}`}>
        <h1 className={`${titleStyle}`}>{title}</h1>
        <div className={`${rowContentStyle}`}>
          {/* searchbar */}
          {/* <Searchbar {...searchbarProps} /> */}
          <Searchbar
            register={register}
            onSubmit={handleSubmit(onSearch)}
            placeholder={PlaceholderText.SEARCH}
            showSearchbar={searchbar}
            showRightIcon
          />
          {/* dropdowns */}
          {Array.isArray(dropdownList)
            ? dropdownList.map((itemProps, index) => (
              <div key={index} className="relative">
                <CommonDropDown {...itemProps} />
                {itemProps.dropdownContent}
              </div>
            ))
            : dropdownList}
          {/* collapse */}
          {collapse && (
            <ToggleButton
              label={collapseButtonLabel}
              left_icon={left_icon}
              right_icon={right_icon}
              containerStyle="flex items-center gap-2"
              textStyle={toggleButtonTextStyle}
              onClick={onToggle}
            />
          )}
          {/* buttons */}
          {Array.isArray(buttonList)
            ? buttonList.map((itemProps, index) => (
              <CommonButton key={index} {...itemProps} />
            ))
            : buttonList}
          {sort && (
            <CommonDropDown
              label={sortLabel}
              left_icon={sortIcon}
              containerStyle="flex items-center gap-2 border border-neutral/600 text-sm font-[Inter-Medium] rounded-4 p-1.5 px-2"
            />
          )}
          {filter && (
            <CommonDropDown
              label={filterLabel}
              left_icon={filterIcon}
              containerStyle="flex items-center gap-2 border border-neutral/600 text-sm font-[Inter-Medium] rounded-4 p-1.5 px-2"
            />
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ExplorerLayout;
