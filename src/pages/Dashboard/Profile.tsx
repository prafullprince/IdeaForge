import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  loggedUserCoursesApi,
  profilePicApi,
  // userDetailsById,
} from "../../services/apiCall/profile";
import ConnectionModal from "../../components/common/ConnectionModal";
import Spinner1 from "../../components/spinners/Spinner1";
import UserCourses from "../../components/common/UserCourses";

const Profile = () => {
  // hook
  const imageRef = useRef<any>(null);

  // store
  const { user } = useSelector((state: any) => state.profile);
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any | "" | null>(null);
  const [preview, setPreview] = useState<any | "" | null>(null);
  const [modalData, setModalData] = useState<any | null>(null);
  const [courses, setCourses] = useState<any>([]);

  // api -> profilePicUpload
  async function profilePicHandler() {
    setLoading(true);
    try {
      await profilePicApi(token, file);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // select image
  function imageSelect() {
    imageRef.current.click();
  }

  // function -> apiCall
  async function fetchUserCourses() {
    try {
      const result = await loggedUserCoursesApi(token);
      setCourses(result);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffect -> courseApiCall
  useEffect(() => {
    fetchUserCourses();
  }, []);

  // loading
  if (loading) return <Spinner1 />;

  return (
    <div className="w-full">
      {/* box */}
      <div className="flex flex-col gap-6 items-center w-full">
        {/* profile top */}
        <div className="flex gap-12 items-center relative sm:flex-row flex-col">
          {/* img */}
          <button onClick={imageSelect}>
            <input
              type="file"
              onChange={(e: any) => {
                setFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              ref={imageRef}
              className="hidden"
            />
            {preview ? (
              <img
                src={preview}
                alt="profile"
                width={200}
                height={200}
                className="rounded-full aspect-square bg-opacity-20 bg-white"
              />
            ) : (
              <img
                src={user?.image}
                alt="profile"
                width={200}
                height={200}
                className="rounded-full"
              />
            )}
          </button>
          {file && (
            <button
              onClick={profilePicHandler}
              className="px-3 py-1 bg-yellow-50 shadow-lg shadow-blue-100 text-richblack-900 rounded-lg absolute left-[10%] top-[40%]"
            >
              Upload
            </button>
          )}
          {/* userDetails */}
          <div className="flex flex-col gap-4">
            {/* button */}
            <div className="flex gap-2 items-center">
              <button className="px-4 py-[6px] bg-pure-greys-700 text-white rounded-lg font-medium">
                Edit profile
              </button>
              <button className="px-4 py-[6px] bg-pure-greys-700 text-white rounded-lg font-medium">
                View archive
              </button>
            </div>
            {/* stats */}
            <div className="flex gap-6 items-center">
              <div className="text-lg">
                {courses?.length} <span className="text-richblack-25">posts</span>
              </div>
              <button
                onClick={() => {
                  setModalData({
                    heading: "Followers",
                    connection: user?.followers,
                  });
                }}
                className="text-lg"
              >
                {user?.followers?.length === 0 ? 0 : user?.followers?.length}{" "}
                <span className="text-richblack-25">followers</span>
              </button>
              <button
                onClick={() => {
                  setModalData({
                    heading: "Following",
                    connection: user?.following,
                  });
                }}
                className="text-lg"
              >
                {user?.following?.length === 0 ? 0 : user?.following?.length}{" "}
                <span className="text-richblack-25">following</span>
              </button>
            </div>
            {/* name */}
            <div>
              <p className="font-semibold text-lg">{user?.name}</p>
              <p className="mt-1 text-richblack-200">{user?.email}</p>
              <p className="mt-1 text-richblack-200">
                {user?.additionalDetails?.contactNumber}
              </p>
              <p className="mt-1 text-richblack-200">
                {user?.additionalDetails?.about?.substring(0, 50)}..
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* tab */}
      <div className="mt-8">
        <div className="text-xl cursor-pointer py-2 px-1 border-b text-yellow-100 border-yellow-50 w-fit">
          Courses
        </div>
      </div>

      {/* courses */}
      <UserCourses courses={courses} />

      {modalData && (
        <ConnectionModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default Profile;
