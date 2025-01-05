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
import ProfileSpinner from "../spinner/ProfileSpinner";

const UserProfile = () => {
  // hook
  const { profileId } = useParams();

  // store
  const { token } = useSelector((state: any) => state.auth);
  // const { user } = useSelector((state:any)=> state.profile);

  // state
  const [details, setDetails] = useState<any>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [flag, setFlag] = useState<any | null>(null);
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // socket
  // const [socket,setSocket] = useState<WebSocket | null>(null);
  // const [connected,setConnected] = useState<boolean>(false);
  // const [chat,setChat] = useState<string>("");
  // const [latest,setLatest] = useState("");

  // function send message
  // function sendMessage(){
  //   if(connected){
  //     socket?.send(JSON.stringify({
  //       type: "SendMessage",
  //       userId: profileId,
  //       payload: {message:chat}
  //     }));
  //   }
  // }

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
    setLoading(true);
    try {
      const result = await userDetailsById(profileId, token);
      setDetails(result?.userDetails);
      setFlag(result?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // function User Courses
  async function fetchUserCourses() {
    try {
      const result: any = await otherUserCoursesApi(profileId);
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

  // useEffect(()=>{
  //   const socket = new WebSocket('ws://localhost:4000');

  //   // open socket
  //   socket.onopen = ()=>{
  //     setConnected(true);
  //     socket?.send(JSON.stringify({
  //       type: "register",
  //       userId: profileId
  //     }))
  //   }

  //   // onmessage
  //   socket.onmessage = (message)=>{
  //     setLatest(message.data);
  //   }

  //   // onerror
  //   socket.onerror = (error)=>{
  //     console.log(error);
  //   }

  //   // onclose
  //   socket.onclose = ()=>{
  //     console.log('connection closed');
  //     setConnected(false);
  //   }

  //   setSocket(socket);

  //   // cleanup function
  //   return ()=>{
  //     socket.close();
  //     console.log("closed during cleanup")
  //   }



  // },[]);

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto">
      {/* user profile dashboard */}
      <div className="flex flex-col gap-6 items-center w-full mt-12">
        {loading ? (
          <div>
            <ProfileSpinner />
          </div>
        ) : (
          <>
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
                  <Link to={`/chat/${123}/user/${profileId}`} className="bg-pure-greys-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:opacity-70 transition-all duration-200">
                    Message
                  </Link>
                </div>
                {/* stats */}
                <div className="flex gap-4 items-center">
                  <div className="text-lg">
                    {courses?.length}{" "}
                    <span className="text-richblack-25">courses</span>
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
                {/* message */}
                {/* <div className="flex items-center gap-2">
                  <Input type="text" value={chat} onChange={(e:any)=> setChat(e.target.value)} placeholder="send message" />
                  <button onClick={sendMessage} className="bg-yellow-100 px-3 py-2 rounded-lg text-lg text-richblack-900">Send message</button>
                </div>
                <div>{latest}</div> */}
              </div>
            </div>
          </>
        )}
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
        <UserCourses courses={courses} type={"user"} />
      </div>

      {modalData && (
        <ConnectionModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default UserProfile;
