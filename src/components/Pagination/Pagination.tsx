import React from "react";
import { PrimaryButton } from "../Buttons/PrimaryButton";
const Pagination: React.FC = ({ totalRecords }) => {
  const totalRecordsLength = Math.max(...totalRecords);

  return (
    <div className="flex justify-end">
      <div className="flex gap-[12px] w-[263px] items-center justify-end">
        <PrimaryButton
          btnText="Previous"
          btnClass="bg-[#1111111A] cursor-pointer !w-fit pt-[3px] pb-[3px] pe-[10px] ps-[10px] !rounded-full text-[#A3A1A1] text-[14px] "
        />
        <p className="flex gap-[12px]">
          {totalRecords?.slice(0, 3)?.map((record) => (
            <span className="cursor-pointer">{record}</span>
          ))}
          <span>...</span>

          <span className="cursor-pointer">{totalRecordsLength}</span>
        </p>
        <PrimaryButton
          btnText="Next"
          btnClass="bg-[#111111] cursor-pointer !w-fit pt-[3px] pb-[3px] pe-[10px] ps-[10px] !rounded-full text-[#A3A1A1] text-[14px] "
        />
      </div>
    </div>
  );
};

export default Pagination;
