import { FC } from "react";
import Searchbar from "../components/Searchbar";
import CommonDropDown from "../components/DropDowns/CommonDropDown";
import CommonButton from "../components/Buttons/ReactionButton";

const SettingsLayout: FC<SettingsLayoutType> = ({
  children_1,
  children_2,
  title,
  description,
  dropdownProps,
  searchbarProps,
  buttonList,
  activeItem,
}) => {
  return (
    <div className="grid grid-cols-12">
      <main className="sticky top-0 hidden lg:block bg-white border border-border-grey/50 rounded-12 2xl:col-span-3 xl:col-span-4 lg:col-span-4 px-4 me-4 h-fit">
        {children_1}
      </main>
      <div className="lg:hidden col-span-12">
        <CommonDropDown {...dropdownProps} />
      </div>
      <main className="bg-white border border-border-grey/50 rounded-12 p-4 me-0.5 2xl:col-span-9 xl:col-span-8 lg:col-span-8 col-span-12">
        {activeItem === "Communication Tags" && (
          <div className="flex justify-between items-center mb-4">
            <Searchbar {...searchbarProps} />
            <div className="flex flex-wrap items-center gap-8">
              {Array.isArray(buttonList)
                ? buttonList.map((itemProps, index) => (
                  <CommonButton key={index} {...itemProps} />
                ))
                : null}
            </div>
          </div>
        )}
        {title && (
          <h1 className="text-dark-grey text-2xl font-[Inter-Medium]">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-dark-grey font-[Inter-Regular] mt-3">
            {description}
          </p>
        )}
        {children_2}
      </main>
    </div>
  );
};

export default SettingsLayout;
