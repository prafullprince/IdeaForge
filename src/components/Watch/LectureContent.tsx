import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FaChevronLeft } from "react-icons/fa";


const LectureContent = () => {

  // hook
  const { sectionId,subSectionId } = useParams();

  // store
  const { courseData,courseContent } = useSelector((state:any)=> state.viewCourse);

  // state
  const [uri,setUri] = useState("");
  const [sectionData,setSectionData] = useState<any>(null);
  const [subSectionData,setSubSectionData] = useState<any>(null);

  // sideEffect
  useEffect(()=>{

    // currentSection acc to params
    const section = courseContent?.filter((section:any)=> section?._id === sectionId );
    setSectionData(section);

    // currentSubSection acc to params
    const subSection = section?.[0]?.subSections?.filter((subSec:any)=> subSec._id === subSectionId);
    setSubSectionData(subSection);

    // setUrl of lecture
    const url = subSection?.[0]?.videoUrl;
    setUri(url);

  },[sectionId,subSectionId]);

  return (
    <div className="w-11/12 lg:w-[80%] mx-auto">
      <div>
        <div></div>
        <Link to={"/dashboard/enrolled-courses"} className="flex gap-1 items-center text-xl text-richblack-100">
          <FaChevronLeft />
          <p className="mt-[2px]">Back to enrolled courses</p>
        </Link>
        <div className="rounded-lg mt-12">
          <ReactPlayer
            url={uri}
            controls
            playing={false}
            className="max-w-[600px] max-h-[600px] rounded-t-lg border border-richblack-700"
          />
        </div>
        <div className="flex flex-col mt-12">
          <p className="text-4xl text-brown-400">{courseData?.courseName}</p>
          <p className="text-2xl text-richblack-5 mt-4">{sectionData?.[0]?.sectionName}</p>
          <p className="mt-2 text-richblack-25 text-lg">{subSectionData?.[0]?.title}</p>
        </div>
      </div>
    </div>
  )
}

export default LectureContent
