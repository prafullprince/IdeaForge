import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Corousel = ({ children }: any) => {
  // state
  const [currIndex, setCurrIndex] = useState<number>(0);

  // prev
  function prev() {
    setCurrIndex((prev) => (prev === 0 ? 0 : prev - 1));
  }

  // next
  function next() {
    setCurrIndex((prev) =>
      prev === children.length - 1 ? children.length - 1 : prev + 1
    );
  }

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex gap-4 transition-transform ease-out duration-500 cursor-pointer`}
        style={{ transform: `translateX(-${currIndex * 90}%)` }}
      >
        {children}
      </div>

      <button
        onClick={prev}
        className={`bg-white bg-opacity-80 p-1 hover:bg-opacity-100 transition-all duration-200 rounded-full absolute top-[40%] left-[1%]`}
      >
        <FaChevronLeft className="text-black text-3xl" />
      </button>
      <button
        onClick={next}
        className={`bg-white bg-opacity-80 p-1 hover:bg-opacity-100 transition-all duration-200 rounded-full absolute right-[1%] top-[40%]`}
      >
        <FaChevronRight className="text-black text-3xl" />
      </button>
    </div>
  );
};

export default Corousel;
