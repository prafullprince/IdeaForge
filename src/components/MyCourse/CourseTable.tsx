import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RxEyeOpen } from "react-icons/rx";


const CourseTable = ({ course }: any) => {
  return (
    <div className="flex gap-4 items-start justify-between flex-col sm:flex-row">
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* img */}
        <div>
          <img src={course?.thumbnail} className="sm:max-w-[220px] sm:max-h-40 w-full rounded-lg" />
        </div>
        {/* text */}
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold text-[#F1F2FF]">
            {course?.courseName?.substring(0,20)}....
          </p>
          <p className="text-[#AFB2BF] text-sm">{course?.courseDesc?.substring(0,15)}....</p>
          <p className="text-[#DBDDEA] text-xs font-medium">
            {course?.createdAt}
          </p>
          <p className="text-[#E7C009] cursor-pointer bg-richblack-600 px-4 py-1 flex items-center gap-1 w-fit rounded-full">
            <FaCheck />
            <p className="text-sm cursor-pointer">{course?.status}</p>
          </p>
        </div>
      </div>
      {/* button */}
      <div className="flex gap-6 items-center">
        <button className="hover:text-caribbeangreen-100 transition-all duration-300">
          <RxEyeOpen className="text-3xl" />
        </button>
        {/* edit */}
        <button className="hover:text-yellow-50 transition-all duration-300">
          <FiEdit className="text-2xl" />
        </button>
        {/* delete */}
        <button className="hover:text-pink-300 transition-all duration-300">
          <MdDelete className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default CourseTable;
