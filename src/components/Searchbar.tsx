import { SearchbarType } from "@/global/@Types/SearchbarTypes";
import { SearchSvg } from "@/global/icons";
import { FC } from "react";
import { ReactSVG } from "react-svg";

const Searchbar: FC<SearchbarType> = ({
  showSearchbar,
  onSubmit,
  register,
  showLeftIcon,
  showRightIcon,
  placeholder,
  containerStyle,
}) => {
  return (
    <>
      {showSearchbar && (
        <form
          onSubmit={onSubmit}
          className={`flex items-center border border-neutral-300 md:w-[270px] lg:w-[290px] md:h-[41px] md:p-0 p-2 md:mt-0 mt-2 rounded-4 w-full ${containerStyle}`}
        >
          {showLeftIcon && <ReactSVG src={SearchSvg} className="ms-2" />}
          <input
            {...(register ? register("search") : {})}
            placeholder={placeholder}
            className="outline-0 w-full px-3"
          />
          {showRightIcon && <ReactSVG src={SearchSvg} className="me-2" />}
        </form>
      )}
    </>
  );
};

export default Searchbar;
