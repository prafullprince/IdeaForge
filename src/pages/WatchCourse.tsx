import { Outlet, useParams } from "react-router-dom";
import SidebarContent from "../components/Watch/SidebarContent";
import { useEffect } from "react";
import { courseViewPageDetailsApi } from "../services/apiCall/course";
import { useDispatch, useSelector } from "react-redux";
import { setCourseContent, setCourseData } from "../slices/viewCourseSlice";

const WatchCourse = () => {
  // hook
  const { courseId } = useParams();
  const dispatch = useDispatch();

  // store
  const { token } = useSelector((state: any) => state.auth);

  // apiCall
  useEffect(() => {
    async function viewApi() {
      try {
        const result = await courseViewPageDetailsApi(courseId, token);
        console.log(result)
        dispatch(setCourseData(result));
        dispatch(setCourseContent(result?.sections));
      } catch (error) {
        console.log(error);
      }
    }
    viewApi();
  }, []);

  return (
    <div className="flex gap-4">
      <div>
        <SidebarContent />
      </div>
      <div className="px-12 py-8 w-full">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WatchCourse;
