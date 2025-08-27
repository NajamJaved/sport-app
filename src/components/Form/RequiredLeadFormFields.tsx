import { RequiredLeadFormFieldType } from "@/global/@Types/FormTypes";
import { FC, useState } from "react";
import { CustomCheckBox } from "../Checkbox/Checkbox";
import { ArrowDownLargeSvg, CheckBoxCheckedSvg, CheckBoxUncheckSvg } from "@/global/icons";
import { ReactSVG } from "react-svg";

const RequiredLeadFormFields: FC<RequiredLeadFormFieldType> = ({
  title,
  actionList,
  contentList,
  containerStyle,
  contentStyle,
  headerStyle,
  contentTextStyle,
  rowStyle,
  contentRowStyle,
  onClick,
  checkBoxProps,
}) => {

  const [isChecked, setIsChecked] = useState<Record<number, boolean>>({});
  const isCheckedHandleCheckBox = (index: number) => {
    setIsChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className={`${containerStyle}`}>
        <div className={`${headerStyle}`}>
          <h4 className="flex justify-center items-center gap-2 text-dark-grey text-sm font-[Inter-Semibold]">
            <ReactSVG src={ArrowDownLargeSvg} />
            <CustomCheckBox
              isChecked={isChecked[100]}
              un_checked={CheckBoxUncheckSvg}
              checked={CheckBoxCheckedSvg}
              onClick={() => isCheckedHandleCheckBox(100)}
            />
            {title}
          </h4>
          <div className={`${rowStyle}`}>
            {actionList.map((item, index) => (
              <div key={index}>
                <p className="text-[#FDB233] text-sm font-[Inter-Semibold] cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${contentStyle}`}>
          {contentList.map((item, index) => (
            <div key={index} onClick={onClick} className={`${contentRowStyle}`}>
              <CustomCheckBox
                isChecked={isChecked[index]}
                un_checked={CheckBoxUncheckSvg}
                checked={CheckBoxCheckedSvg}
                onClick={() => isCheckedHandleCheckBox(index)}
                {...checkBoxProps}
              />
              <p className={`${contentTextStyle}`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RequiredLeadFormFields;
