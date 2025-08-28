import { FC } from "react";

type RadioButtonProps = {
  id: string;
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const RadioButton: FC<RadioButtonProps> = ({ id, name, label, ...rest }) => (
  <div className="flex items-center justify-center">
    <input id={id} name={name} type="radio" className="" {...rest} />
    <label
      htmlFor={id}
      className="w-full py-1 ms-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
  </div>
);

const CustomRadio = ({
  containerStyle,
  indicatorStyle,
}: {
  containerStyle: string;
  indicatorStyle?: string;
}) => {
  return (
    <div className={`${containerStyle}`}>
      <div className={`${indicatorStyle}`} />
    </div>
  );
};

export default RadioButton;

export { CustomRadio };
