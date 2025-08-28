import React, { useState } from "react";

const PrimaryAccordion: React.FC = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#f5f5f6] rounded-[4px] cursor-pointer mb-[14px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center flex-row-reverse w-full px-5 py-4 font-medium text-left text-gray-500 rounded-xl  hover:bg-gray-100 gap-3 justify-end"
        >
          <span className="text-[14px] text-black font-semibold">{label}</span>
          <svg
            className={`w-3 h-3 transform  transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5L5 1 1 5"
            />
          </svg>
        </button>
      </div>
      {isOpen && children}
    </>
  );
};

export default PrimaryAccordion;
