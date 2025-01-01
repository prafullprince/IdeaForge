import { Link } from "react-router-dom";
import ProfileView from "./ProfileView";
import ProfileSpinner from "../../spinner/ProfileSpinner";

const UserCourses = ({ courses, type, courseLoading }: any) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8">
      {courseLoading ? (
        <div className="h-full w-screen mt-12">
          <ProfileSpinner />
        </div>
      ) : (
        <>
          {courses?.length === 0 ? (
            <div className="">No course found</div>
          ) : (
            <>
              {courses?.map((course: any) => (
                <div
                  key={course._id}
                  className="hover:scale-95 duration-200 transition-all hover:shadow-sm hover:shadow-yellow-100"
                >
                  {/* instructor */}
                  <Link
                    to={`/profile/${course?.instructor?._id}`}
                    className="flex gap-2 items-center bg-richblack-900 py-2 group relative w-fit"
                  >
                    <img
                      src={course?.instructor?.image}
                      className="min-w-10 min-h-10 w-10 h-10 rounded-full cursor-pointer bg-cover bg-center border border-blue-25"
                    />
                    <p className="cursor-pointer text-richblack-5 font-semibold">
                      {course?.instructor?.name}
                    </p>
                    {/* profileCard */}
                    <ProfileView course={course} />
                  </Link>
                  {/* courseDetails */}
                  <Link
                    to={
                      type === "enrolled"
                        ? `/watch-course/${course?._id}/section/${course?.sections?.[0]?._id}/sub-section/${course?.sections?.[0]?.subSections?.[0]}`
                        : `/course/details/${course?._id}`
                    }
                    className="flex flex-col gap-1"
                  >
                    <img className="aspect-video" src={course?.thumbnail} />
                    <p className="text-richblack-5 font-semibold text-lg break-words text-wrap text-left px-2 mt-2">
                      {course?.courseName}
                    </p>
                    <p className="text-pure-greys-100 text-sm font-medium break-words text-wrap text-left px-2 mb-2">
                      {course?.courseDesc}
                    </p>
                  </Link>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserCourses;
