import { useForm } from "react-hook-form";
import CommonButton from "../Buttons/CommonButton";
import { ButtonText, PlaceholderText } from "@/global/text";
import { ArrowDownLargeSvg, PlusCircleSvg } from "@/global/icons";
import Searchbar from "../Searchbar";
import CommonDropDown from "../DropDowns/CommonDropDown";
import { useNavigate } from "react-router-dom";

const InviteTeamMemberForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSearch = () => {
    reset();
  };

  return (
    <div className="bg-white border border-border-grey/40 p-4 rounded-12 lg:w-9/12 w-full">
      {/* header */}
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-[Inter-Medium]">
          Who would you like to invite
        </h1>
        <CommonButton
          label={ButtonText.ADD_ANOTHER_MEMBER}
          left_icon={PlusCircleSvg}
          buttonContainerStyle="flex items-center gap-1 bg-primary text-white text-sm font-[Inter-Medium] p-2.5 rounded-4"
        />
      </div>
      {/* input fields */}
      <div className="flex flex-wrap sm:gap-4">
        <div className="mt-4">
          <label className="text-sm font-[Inter-Medium]">
            Enter email address
          </label>
          <div className="mt-1.5">
            <Searchbar
              register={register}
              placeholder={PlaceholderText.SEARCH}
              onSubmit={handleSubmit(onSearch)}
              showLeftIcon
              showSearchbar
            />
          </div>
        </div>
        <div className="w-[360px] mt-4">
          <label className="text-sm font-[Inter-Medium]">
            Select User Role
          </label>
          <CommonDropDown
            label="Company Admin"
            right_icon={ArrowDownLargeSvg}
            containerStyle="flex justify-between items-center border border-border-grey/40 p-2 rounded-4 mt-1.5"
          />
        </div>
        <div className="w-full lg:mt-0 mt-4">
          <div className="flex items-center gap-1 mb-2">
            <label className="text-sm font-[Inter-Medium]">
              Note to team members
            </label>
            <p className="text-light-grey/50 text-sm font-[Inter-Medium]">
              (optional)
            </p>
          </div>
          <textarea
            rows={6}
            placeholder="Include a personalized message..."
            className="border border-border-grey/40 rounded-4 p-2 resize-none w-8/12 outline-0"
          ></textarea>
        </div>
      </div>
      {/* action buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <CommonButton
          label={ButtonText.CANCEL}
          buttonContainerStyle="bg-border-grey/20 text-dark-grey text-sm font-[Inter-Semibold] p-2.5 px-8 rounded-4"
          onClick={() => navigate("/team")}
        />
        <CommonButton
          label={ButtonText.ADD_1_TEAM_MEMBER}
          left_icon={PlusCircleSvg}
          buttonContainerStyle="flex items-center gap-1 bg-primary text-white text-sm font-[Inter-Semibold] p-2.5 rounded-4"
        />
      </div>
    </div>
  );
};

export default InviteTeamMemberForm;
