import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RxEyeOpen } from "react-icons/rx";
import { deleteCourseApi } from "../../services/apiCall/course";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditzCourse, setStep } from "../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { IModalData } from "../Dashboard/Sidebar";
import { COURSE_STATUS } from "../../lib/constants";
import { TfiTimer } from "react-icons/tfi";


const CourseTable = ({ course,setCourses,courses }: any) => {
  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // store
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [modalData,setModalData] = useState<IModalData | null>(null);

  // deleteHandler
  async function deleteHandler() {
    try {
      const formData = {
        courseId: course?._id,
        categoryId: course?.category,
      };
      await deleteCourseApi(formData, token);
      const remainingCourse = courses.filter((item:any)=> item._id !== course?._id);
      setCourses(remainingCourse);
      setModalData(null);
    } catch (error) {
      console.log(error);
      setModalData(null);
    }
  }

  // editHandler
  async function editHandler() {
    dispatch(setEditzCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    navigate("/dashboard/add-Course");
  }

  return (
    <div className="flex shadow-sm shadow- gap-4 items-start justify-between flex-col sm:flex-row cursor-pointer bg-richblack-700 hover:bg-richblack-800 transition-all duration-300 p-4 rounded-lg">
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* img */}
        <div>
          <img
            src={course?.thumbnail}
            className="sm:max-w-[220px] sm:max-h-40 sm:min-h-40 sm:min-w-[220px] w-full max-h-40 aspect-video rounded-lg"
          />
        </div>
        {/* text */}
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold text-[#F1F2FF]">
            {course?.courseName?.substring(0, 20)}....
          </p>
          <p className="text-[#AFB2BF] text-sm">
            {course?.courseDesc?.substring(0, 15)}....
          </p>
          <p className="text-[#DBDDEA] text-xs font-medium">
            {course?.createdAt?.split("T")[0]}
          </p>
          <p className={`${course?.status === COURSE_STATUS.PUBLISHED ? "text-[#F37290] bg-richblack-600" : "text-[#E7C009] bg-richblack-600"} cursor-pointer px-3 py-1 flex items-center gap-2 w-fit rounded-full text-sm`}>
            {course.status === COURSE_STATUS.PUBLISHED ? <FaCheck /> : <TfiTimer />}
            {course?.status}
          </p>
        </div>
      </div>
      {/* button */}
      <div className="flex gap-6 items-center text-richblue-5">
        <button className="hover:text-caribbeangreen-100 transition-all duration-300">
          <RxEyeOpen className="text-3xl" />
        </button>
        {/* edit */}
        <button
          onClick={editHandler}
          className="hover:text-yellow-50 transition-all duration-300"
        >
          <FiEdit className="text-2xl" />
        </button>
        {/* delete */}
        <button
          onClick={()=>{
            setModalData({
              text1:"Are you sure?",
              text2:"This course will be deleted",
              btn1Text:"Delete",
              btn2Text:"Cancel",
              btn1Handler: ()=> deleteHandler(),
              btn2Handler: ()=> setModalData(null),
              heading:"Course deletion modal"
            })
          }}
          className="hover:text-pink-300 transition-all duration-300"
        >
          <MdDelete className="text-3xl" />
        </button>
      </div>
      {
        modalData && <ConfirmationModal modalData={modalData} setModalData={setModalData} />
      }
    </div>
  );
};

export default CourseTable;
