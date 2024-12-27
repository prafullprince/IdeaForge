import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import SubSectionContent from "./SubSectionContent";

const CourseContent = ({ courseDetails }: any) => {
  // state
  const [visible, setVisible] = useState<any>(false);

  // toggle function
  function toggleVisibility(id: any) {
    setVisible((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="flex flex-col gap-3 mt-8 break-words text-wrap">
      {/* header */}
      <div className="flex gap-4 flex-col">
        {/* heading */}
        <div className="text-[#F1F2FF] text-2xl font-semibold">
          Course content
        </div>
        {/* details */}
        <div className="flex items-center justify-between">
          {/* stat */}
          <div className="flex items-center gap-1 text-[#C5C7D4] text-sm">
            <p>10 sections</p>
            <p>41 lectures</p>
            <p>7h 57m total length</p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-[#FFD60A] text-sm font-medium"
          >
            Collapse all sections
          </button>
        </div>
      </div>
      {/* content */}
      <div className="border border-[#424854] mt-2">
        {courseDetails?.sections.length === 0 ? (
          <p className="text-richblack-5 py-4 px-8">No content available</p>
        ) : (
          <>
            {courseDetails?.sections?.map((section: any) => (
              <div key={section._id} className="flex flex-col">
                {/* section */}
                <div
                  onClick={() => toggleVisibility(section._id)}
                  className="bg-pure-greys-700 hover:shadow-md hover:shadow-blue-100 border hover:bg-pure-greys-900 duration-200 transition-all border-[#424854] py-4 px-8 text-sm font-medium flex items-center justify-between cursor-pointer"
                >
                  <div className="flex gap-2 items-center">
                    {visible[section._id] ? (
                      <IoMdArrowDropup className="text-xl text-richblack-25" />
                    ) : (
                      <IoMdArrowDropdown className="text-xl text-richblack-25" />
                    )}
                    <p>{section?.sectionName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#FFD60A] text-sm">5 Lectures</p>
                    <p>51 Min</p>
                  </div>
                </div>
                {/* subSection */}
                {visible[section._id] && <SubSectionContent section={section} />}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
