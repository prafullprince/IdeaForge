import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TbBroadcastOff } from "react-icons/tb";
import { PiBroadcastBold } from "react-icons/pi";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const SidebarContent = () => {
  // hook
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();

  // store
  const { courseData, courseContent } = useSelector(
    (state: any) => state.viewCourse
  );

  // state -> activeSection and activeSubSection
  const [activeSection, setActiveSection] = useState<any>(false); // initial is section[0]
  const [activeSubSection, setActiveSubSection] = useState(""); // initial is section[0].subSections[0]
  const [isOpen, setIsOpen] = useState(true);

  // visibilityHandler
  function visibilityHandler(id: any) {
    setActiveSection((prev: any) => ({
      ...prev,
      [id]: !prev?.[id],
    }));
  }

  // sideEffects -> setLectureContent of section[0] and subSection[0]
  useEffect(() => {
    // currentSectionAccToParams
    const currentSectionIndex = courseContent?.findIndex(
      (section: any) => section?._id === sectionId
    );
    setActiveSection(courseContent?.[currentSectionIndex]?._id);

    // currentSubSectionAccToParams
    const currentSubSectionIndex = courseContent?.[
      currentSectionIndex
    ]?.subSections?.findIndex(
      (subSection: any) => subSection?._id === subSectionId
    );
    setActiveSubSection(
      courseContent?.[currentSectionIndex]?.subSections?.[
        currentSubSectionIndex
      ]?._id
    );
  }, []);

  return (
    <div className="bg-richblack-800 py-2 relative min-h-screen">
      {/* sidebarButton */}
      <button
        onClick={() => setIsOpen((prev: any) => !prev)}
        className={`my-4 p-2 ${
          isOpen ? "hover:bg-richblack-900" : "hover:bg-richblack-700"
        } w-fit transition-all duration-300 absolute top-0 left-2 rounded-lg`}
      >
        {isOpen ? (
          <BsLayoutTextSidebarReverse className="text-3xl text-yellow-50 font-bold" />
        ) : (
          <BsLayoutTextSidebar className="text-3xl text-blue-50 font-bold" />
        )}
        {isOpen ? (
          <div className="w-1 h-1 bg-caribbeangreen-50 rounded-full absolute top-3 left-[10px]"></div>
        ) : (
          <div className="w-1 h-1 bg-caribbeangreen-50 rounded-full absolute top-3 right-[10px]"></div>
        )}
      </button>
      <div className="mt-24"></div>

      {/* courseName */}
      <div
        className={`absolute xl:top-[28px] top-[20px] left-[60px] text-yellow-50 font-edu-sa text-xl break-words text-wrap ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {courseData?.courseName?.substring(0, 40)}..
      </div>

      {/* courseContent */}
      <div
        className={`flex flex-col gap-1 mt-12 ${
          isOpen ? "block" : "hidden"
        } transition-all ease-in-out duration-500 2xl:w-[450px] xl:w-[400px] md:min-w-[320px] sm:w-[280px] w-[250px]`}
      >
        {courseContent?.map((section: any) => (
          <div key={section?._id}>
            <div
              onClick={() => visibilityHandler(section?._id)}
              className={`flex gap-2 py-4 px-4 items-center cursor-pointer hover:shadow-md hover:shadow-yellow-100 duration-100 transition-all ${
                activeSection?.[section?._id]
                  ? "bg-richblack-600 text-yellow-25 font-semibold"
                  : "bg-richblack-700"
              }`}
            >
              <AiOutlineDoubleLeft
                className={`text-2xl font-bold ${
                  activeSection?.[section?._id] ? "-rotate-90" : ""
                }`}
              />
              <p className="break-words text-wrap">
                {section?.sectionName?.substring(0, 30)}..
              </p>
            </div>
            {activeSection?.[section?._id] && (
              <div className={`flex flex-col gap-1 py-1`}>
                {section?.subSections?.length === 0 ? (
                  <p className="px-8 py-1">No content available</p>
                ) : (
                  <>
                    {section?.subSections?.map((subSec: any) => (
                      <div
                        onClick={() => {
                          navigate(
                            `/watch-course/${courseData?._id}/section/${section?._id}/sub-section/${subSec?._id}`
                          );
                          setActiveSubSection(subSec?._id);
                        }}
                        key={subSec?._id}
                        className={`${
                          activeSubSection === subSec?._id
                            ? "text-[#47A5C5]"
                            : "text-richblack-50"
                        } px-8 py-1 cursor-pointer flex gap-2 items-center`}
                      >
                        {activeSubSection === subSec?._id ? (
                          <PiBroadcastBold className="lg:text-2xl sm:text-3xl text-4xl font-[900] text-[#47A5C5]" />
                        ) : (
                          <TbBroadcastOff
                            className={`lg:text-2xl sm:text-3xl ${
                              subSec?.title?.length > 20
                                ? "text-4xl lg:text-2xl sm:text-3xl"
                                : "text-lg lg:text-2xl sm:text-3xl"
                            } font-[900]`}
                          />
                        )}
                        <p className={`break-words text-wrap text-sm`}>
                          {subSec?.title?.substring(0, 40)}...
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarContent;
