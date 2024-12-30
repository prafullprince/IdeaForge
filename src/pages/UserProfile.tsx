import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  followApi,
  otherUserCoursesApi,
  userDetailsById,
} from "../services/apiCall/profile";
import ConnectionModal from "../components/common/ConnectionModal";
import { useSelector } from "react-redux";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import UserCourses from "../components/common/UserCourses";

const UserProfile = () => {
  // hook
  const { profileId } = useParams();

  // store
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [details, setDetails] = useState<any>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [flag, setFlag] = useState<any | null>(null);
  const [courses, setCourses] = useState<any>([]);

  // followHandler
  async function followHandler(toUser: any) {
    try {
      const result = await followApi(toUser, token);
      setFlag(result);
    } catch (error) {
      console.log(error);
    }
  }

  // function fetchUserDetails
  async function fetchUserDetails() {
    try {
      const result = await userDetailsById(profileId, token);
      setDetails(result?.userDetails);
      setFlag(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  // function User Courses
  async function fetchUserCourses() {
    try {
      const result: any = await otherUserCoursesApi(profileId);
      console.log(result);
      setCourses(result);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffect -> userDetails
  useEffect(() => {
    fetchUserDetails();
  }, [profileId, flag]);

  useEffect(() => {
    fetchUserCourses();
  }, [profileId]);

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto">
      {/* user profile dashboard */}
      <div className="flex flex-col gap-6 items-center w-full mt-12">
        {/* profile top */}
        <div className="flex gap-12 items-center relative sm:flex-row flex-col">
          {/* img */}
          <img
            src={details?.image}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full"
          />

          {/* userDetails */}
          <div className="flex flex-col gap-4">
            {/* name and follow/unfollow button */}
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-lg">{details?.name}</p>
              <button
                onClick={() => followHandler(details?._id)}
                className="hover:opacity-85 duration-200 transition-all"
              >
                {!flag ? (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-300">
                    <RiUserFollowLine />
                    <p>Follow</p>
                  </div>
                ) : (
                  <div className="bg-pure-greys-600 px-3 py-1 rounded-lg flex items-center gap-1">
                    <RiUserUnfollowLine />
                    <p>Unfollow</p>
                  </div>
                )}
              </button>
            </div>
            {/* stats */}
            <div className="flex gap-4 items-center">
              <div className="text-lg">
                4 <span className="text-richblack-25">courses</span>
              </div>
              <button
                onClick={() => {
                  setModalData({
                    heading: "Followers",
                    connection: details?.followers,
                  });
                }}
                className="text-lg"
              >
                {details?.followers?.length === 0
                  ? 0
                  : details?.followers?.length}{" "}
                <span className="text-richblack-25">followers</span>
              </button>
              <button
                onClick={() => {
                  setModalData({
                    heading: "Following",
                    connection: details?.following,
                  });
                }}
                className="text-lg"
              >
                {details?.following?.length === 0
                  ? 0
                  : details?.following?.length}{" "}
                <span className="text-richblack-25">following</span>
              </button>
            </div>
            {/* name */}
            <div>
              <p className="mt-1 text-richblack-200">{details?.email}</p>
              <p className="mt-1 text-richblack-200">
                {details?.additionalDetails?.contactNumber}
              </p>
              <p className="mt-1 text-richblack-200">
                {details?.additionalDetails?.about?.substring(0, 50)}..
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* userCourses */}
      <div className="flex flex-col gap-4 items-start">
        {/* tab */}
        <div className="mt-8">
          <div className="text-xl cursor-pointer py-2 px-1 border-b text-yellow-100 border-yellow-50 w-fit">
            Courses
          </div>
        </div>
        {/* post */}
        <UserCourses courses={courses} />
      </div>

      {modalData && (
        <ConnectionModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default UserProfile;
