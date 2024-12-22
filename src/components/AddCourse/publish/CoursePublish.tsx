import { useState } from "react";
import Tab from "../../common/Tab"
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditzCourse, setEditzSection, setEditzSubSection, setSection, setStep } from "../../../slices/courseSlice";
import { publishCourseApi } from "../../../services/apiCall/course";
import { useNavigate } from "react-router-dom";


const data = ["Status","Published"];

const CoursePublish = () => {

  // hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const { token } = useSelector((state:any)=>state.auth);
  const { course } = useSelector((state:any)=>state.course);

  // state
  const [tabData,setTabData] = useState(data[0]);

  // publishHandler -> apiCall
  async function publishHandler(){
    try {
      // apiCall
      const formData = new FormData();
      formData.append("courseId",course._id);
      formData.append("status",tabData);
      await publishCourseApi(formData,token);
      setTabData(data[0]);
      dispatch(setStep(1));
      dispatch(setCourse(null));
      dispatch(setSection(null));
      dispatch(setEditzCourse(false));
      dispatch(setEditzSection(false));
      dispatch(setEditzSubSection(false));
      navigate("/dashboard/my-courses");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-richblack-800 p-6 rounded-lg flex flex-col gap-4">
      {/* tab */}
      <div className="text-[#F1F2FF] text-2xl font-semibold">Publish Settings</div>
      <div className="w-fit">
        <Tab data={data} tabData={tabData} setTabData={setTabData} which="publishStatus" />
      </div>
      <div className="flex gap-6 items-center mt-6">
        <button onClick={()=> dispatch(setStep(2))} className="flex items-center gap-1 bg-richblack-900 rounded-lg text-richblack-5 px-3 py-2">
          <FaAngleLeft />
          <p>Back</p>
        </button>
        <button onClick={publishHandler} className="flex items-center gap-1 bg-yellow-50 text-richblack-900 px-3 py-2 rounded-lg">
          <MdOutlinePublishedWithChanges className="text-lg" />
          <p>Save</p>
        </button>
      </div>
    </div>
  )
}

export default CoursePublish
