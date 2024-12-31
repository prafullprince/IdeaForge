import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ProfileView = ({ course }: any) => {
  // store
  const { user } = useSelector((state: any) => state.profile);

  return (
    <div className="absolute ease-in-out duration-300 transition-all shadow-xl rounded-lg z-50 shadow-richblack-100 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex flex-col gap-2 bg-black top-[100%] left-[20%] p-4">
      {/* profileDetails */}
      <Link to={`/profile/${course?.instructor?._id}`} className="flex gap-2 items-center">
        <img
          src={course?.instructor?.image}
          className="min-w-10 min-h-10 w-12 h-12 rounded-full cursor-pointer bg-cover bg-center border border-blue-25"
        />
        <p className="cursor-pointer text-richblack-5 font-semibold text-lg">
          {course?.instructor?.name}
        </p>
      </Link>
      {/* stats */}
      <div className="flex gap-6 items-center mt-4">
        <div className="text-lg text-center">
          {course?.instructor?.courses?.length}{" "}
          <span className="text-richblack-25">posts</span>
        </div>
        <div className="text-lg text-center">
          {course?.instructor?.followers?.length === 0
            ? 0
            : course?.instructor?.followers?.length}{" "}
          <span className="text-richblack-25">followers</span>
        </div>
        <div className="text-lg text-richblack-5 text-center">
          {course?.instructor?.following?.length === 0
            ? 0
            : course?.instructor?.following?.length}{" "}
          <span className="text-richblack-25">following</span>
        </div>
      </div>
      {/* buttons */}
      <button className="w-full mt-2">
        {course?.instructor?.followers?.includes(user?._id) ? (
          <div className="flex items-center gap-1 px-3 w-full py-1 rounded-lg bg-pure-greys-600 justify-center hover:bg-opacity-85 duration-150 transition-all">
            <RiUserUnfollowLine />
            <p>Unfollow</p>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 w-full py-1 rounded-lg bg-blue-200 justify-center hover:bg-opacity-85 duration-150 transition-all">
            <RiUserFollowLine />
            <p>Follow</p>
          </div>
        )}
      </button>
    </div>
  );
};

export default ProfileView;
