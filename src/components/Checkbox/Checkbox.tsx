import { FC } from "react";
import { ReactSVG } from "react-svg";

type CheckboxProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: FC<CheckboxProps> = ({ id, label, ...rest }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      className="w-5 h-5 cursor-pointer"
      {...rest}
    />
    <label htmlFor={id} className="w-full py-3 ms-2 text-sm text-gray-90">
      {label}
    </label>
  </div>
);

const CustomCheckBox = ({
  un_checked,
  checked,
  isChecked,
  onClick,
}: {
  un_checked?: string;
  checked?: string;
  isChecked?: boolean;
  onClick?: () => void;
}) => {
  return (
    <ReactSVG
      src={isChecked ? checked ?? "" : un_checked ?? ""}
      onClick={onClick}
      className="hover:bg-[#F27B34]/20 p-0.5 rounded-md cursor-pointer duration-200 w-5 h-5"
    />
  );
};

export { Checkbox, CustomCheckBox };
