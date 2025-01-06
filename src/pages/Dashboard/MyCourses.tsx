import { instructorCoursesApi } from "../../services/apiCall/course";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import CourseTable from "../../components/MyCourse/CourseTable";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { setStep } from "../../slices/courseSlice";
import Tab from "../../components/common/Tab";
import { FaRightLong } from "react-icons/fa6";
import { COURSE_STATUS } from "../../lib/constants";

// data
const data = [COURSE_STATUS.DRAFT, COURSE_STATUS.PUBLISHED];

const MyCourses = () => {

  // hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // store
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tabData, setTabData] = useState(data[0]);
  const limit = 3;

  // scrollHandler
  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;

    if (clientHeight + scrollTop >= scrollHeight && !loading) {
      setPage((prev: any) => prev + 1);
    }
  }

  // apiCall of instructor courses
  async function instructorCourses() {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // apiCall
      const result = await instructorCoursesApi(token, page, limit, tabData);
      setCourses((prev: any) => {
        if (page === 1) {
          viewRef?.current?.scrollIntoView({behavior: "smooth"})
        }
        return page === 1 ? result.data : [...prev, ...result.data];
      });

      // check is more data to load
      if (page >= result.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // sideEffects
  useEffect(() => {
    instructorCourses();
    loaderRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  // sideEffects -> apiCall of instructor courses when tab changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setCourses([]);
    instructorCourses();
  }, [tabData]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {/* topbar */}
        <div className="flex sm:justify-between w-full gap-4 flex-col sm:flex-row">
          {/* left */}
          <div className="flex flex-col gap-4">
            <p className="text-[#838894] text-sm cursor-pointer">
              <Link to={"/"}>Home</Link> /{" "}
              <Link to={"/dashboard/profile"}>Dashboard</Link> /{" "}
              <span className="text-yellow-50">Courses</span>
            </p>
            <div className="text-[#F1F2FF] text-3xl font-medium">My Course</div>
          </div>
          {/* right */}
          <div>
            <button
              onClick={() => {
                dispatch(setStep(1));
                navigate("/dashboard/add-course");
              }}
              className="flex gap-1 items-center bg-yellow-50 text-richblack-900 px-4 py-2 mt-2 rounded-lg"
            >
              <IoMdAdd className="text-2xl text-richblack-900" />
              <p className="text-lg font-medium">New Course</p>
            </button>
          </div>
        </div>
        {/* courses */}
        <div className="flex flex-col relative pb-10">
          {/* header */}
          <div className="bg-richblack-900 flex sm:gap-4 flex-col sm:flex-row sm:items-center sm:justify-between px-8 border border-richblack-600 border-opacity-55">
            <h2 className="font-semibold text-richblack-5 px-2 py-4 sm:flex gap-2 items-center hidden">
              COURSES
              <FaRightLong />
            </h2>
            <div className="py-4 w-fit">
              <Tab
                data={data}
                tabData={tabData}
                setTabData={setTabData}
                which="My Course"
              />
            </div>
          </div>
          {/* table */}
          <div
            onScroll={handleScroll}
            ref={viewRef}
            className="px-4 py-4 relative flex flex-col gap-6 bg-richblack-900 min-h-40 overflow-scroll h-[600px]"
          >
            {courses?.map((course: any) => (
              <CourseTable
                key={course?._id}
                course={course}
                courses={courses}
                setCourses={setCourses}
              />
            ))}
            <div ref={loaderRef} className="min-h-[150px]"></div>
          </div>
          {loading && (
            <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 bottom-1 animate-l23">
              <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
              <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
