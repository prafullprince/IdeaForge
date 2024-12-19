import { MdOutlineCreateNewFolder } from "react-icons/md";
import { instructorCoursesApi } from "../../services/apiCall/course";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CourseTable from "../../components/MyCourse/CourseTable";



const MyCourses = () => {

  // store
  const {token} = useSelector((state:any)=>state.auth);

  // state
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(false);

  // sideEffects -> apiCall of instructor courses
  useEffect(()=>{
    async function instructorCourses(){
      setLoading(true);
      try {
        // apiCall
        const result = await instructorCoursesApi(token);
        setCourses(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    instructorCourses()
  },[])

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {/* topbar */}
        <div className="flex justify-between w-full">
          {/* left */}
          <div className="flex flex-col gap-4">
            <p className="text-[#838894] text-sm">Home / Dashboard / <span className="text-yellow-50">Courses</span></p>
            <div className="text-[#F1F2FF] text-3xl font-medium">My Course</div>
          </div>
          {/* right */}
          <div>
            <button className="flex gap-2 items-center bg-yellow-50 text-richblack-900 px-4 py-2 mt-2 rounded-lg">
              <MdOutlineCreateNewFolder className="text-3xl text-richblack-900" />
              <p className="text-xl font-medium">New</p>
            </button>
          </div>
        </div>
        {/* courses */}
        <div className="flex flex-col">
          {/* header */}
          <div className="h-12 bg-richblack-900 flex gap-4 items-center px-4">
            <h2 className="font-medium text-[#AFB2BF]">COURSES</h2>
          </div>
          {/* table */}
          <div className="px-4 py-4 flex flex-col gap-12 border-0 rounded-b-lg border-t-0 bg-richblack-800">
            {
              loading ? (<p className="loader"></p>) : 
              (
                <>
                  {
                    courses.map((course:any)=>(
                      <CourseTable key={course?._id} course={course} />
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
