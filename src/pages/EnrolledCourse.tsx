import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { encrolledCourse } from "../services/apiCall/course";

const EnrolledCourse = () => {

  // store
  const { token } = useSelector((state:any)=>state.auth);

  // state
  const [courses,setCourses] = useState<any>([]);
  console.log(courses)
  // sideEffect -> enrolledCourseApi
  useEffect(()=>{
    async function userEnrolledCourse(token:string) {
      try {
        const result = await encrolledCourse(token);
        setCourses(result);
      } catch (error) {
        console.log(error);
      }
    }
    userEnrolledCourse(token);
  },[])


  return (
    <div className="flex flex-col gap-6 w-11/12 lg:w-[80%] mx-auto">
      {/* header */}
      <div className="flex items-center gap-1">
        <Link className="text-[#838894] text-sm" to={"/"}>
          Home /{" "}
        </Link>
        <Link className="text-[#838894] text-sm" to={`/dashboard/profile`}>
          {" "}
          Dashboard /{" "}
        </Link>
        <span className="text-[#FFD60A] font-medium text-sm">Enrolled courses</span>
      </div>
      <div className="text-[#F1F2FF] font-medium text-3xl">Enrolled Courses</div>
      <div className="flex flex-wrap gap-12">
        {
          courses?.map((item:any)=>(
            <Link to={`/watch-course/${item?._id}/section/${item?.sections?.[0]?._id}/sub-section/${item?.sections?.[0]?.subSections?.[0]}`} key={item?._id} className="sm:max-w-[380px] max-w-[220px] bg-pure-greys-800 rounded-lg" >
              <div className="flex flex-col break-words text-wrap">
                {/* img */}
                <div>
                  <img src={item?.thumbnail} className="sm:min-w-[300px] w-[220px] sm:w-[300px] sm:min-h-[230px] sm:h-[230px] min-h-[160px] h-[160px] rounded-t-lg" />
                </div>
                {/* details */}
                <div className="flex flex-col gap-4 py-4 px-2">
                  <p>{item?.courseName?.substring(0,30)}..</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default EnrolledCourse
