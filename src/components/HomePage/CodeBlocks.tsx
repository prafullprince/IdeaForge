import React from "react";
import HighlightButton from "./HighlightButton";

interface CodingBlocksProps {
  heading: React.ReactNode;
  para: string;
  btnText1: string;
  btnText2: string;
  isReverse: boolean;
}

const data: string[] = [
  "<!DOCTYPE html>",
  "<html>",
  "head><title>Example</title><linkrel='stylesheet'href='styles.css'>",
  "/head>",
  "body>",
  "h1><ahref='/'>Header</a>",
  "/h1>",
  "nav><ahref='one/'>One</a><ahref='two/'>Two</a><ahref='three/'>Three</a>",
  "/nav>",
];

const CodeBlocks = ({
  heading,
  para,
  btnText1,
  btnText2,
  isReverse,
}: CodingBlocksProps) => {
  return (
    <div
      className={`flex flex-col gap-12 lg:flex-row lg:justify-between lg:items-center ${
        isReverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* left part */}
      <div className="flex flex-col gap-4 lg:max-w-2xl">
        <div className="text-[#F1F2FF] font-semibold text-[36px] leading-[44px] tracking-[-2%]">
          {heading}
        </div>
        <p className="break-words text-left text-[#838894] font-semibold text-[16px] leading-6">
          {para}
        </p>
        <div className="flex gap-4 items-center mt-6">
          <HighlightButton isActive={true} linkto="/login">
            {btnText1}
          </HighlightButton>
          <HighlightButton isActive={false} linkto="/signup">
            {btnText2}
          </HighlightButton>
        </div>
      </div>
      {/* right part */}
      <div
        className={`p-6 bg-richblack-800 border-richblack-900 border ${
          isReverse === false
            ? "shadow-md shadow-blue-100"
            : "shadow-md shadow-yellow-50"
        }`}
      >
        {data.map((line, index) => (
          <div
            key={index}
            className="flex gap-4 break-all"
          >
            <p className="text-richblack-400 font-semibold">{index + 1}</p>
            <p
              className={`${index === 0 ? "text-[#E7BC5B]" : ""} ${
                index === 3 ? "text-[#eb483c]" : ""
              } ${index === 5 ? "text-[#eb483c]" : ""} ${
                index === 8 ? "text-[#eb483c]" : ""
              } font-semibold sm:font-bold break-words text-wrap text-left`}
            >
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlocks;
