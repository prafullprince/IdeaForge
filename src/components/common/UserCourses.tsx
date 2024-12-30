import { Link } from "react-router-dom";

const UserCourses = ({ courses }: any) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8">
      {courses?.length === 0 ? (
        <div className="">No course found</div>
      ) : (
        <>
          {courses?.map((course: any) => (
            <Link
              to={`/course/details/${course?._id}`}
              key={course._id}
              className="flex flex-col gap-1"
            >
              <img
                className="aspect-video rounded-lg"
                src={course?.thumbnail}
              />
              <p className="text-richblack-5 font-semibold text-lg break-words text-wrap text-left">
                {course?.courseName}
              </p>
              <p className="text-pure-greys-100 text-sm font-medium break-words text-wrap text-left">
                {course?.courseDesc}
              </p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default UserCourses;
