import { BsCart3 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchModal from "../common/SearchModal";
import { IoNotifications } from "react-icons/io5";
import NotModal from "../common/NotModal";
import {
  allNotificationsApi,
  allUserNotificationsApi,
  markAsReadNotificationApi,
} from "../../services/apiCall/extra";
import { BsChatDots } from "react-icons/bs";

const LoggedUser = () => {
  // store
  const { totalItems } = useSelector((state: any) => state.cart);
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [modalData, setModalData] = useState<any>(null);
  const [notModal, setNotModal] = useState<any>(null);
  const [notification, setNotification] = useState<any>([]);
  const [totalNotification, setTotalNotification] = useState(0);

  // function -> all notifications
  async function fetchAllNotification() {
    try {
      const result = await allUserNotificationsApi(token);
      setNotification(result);
    } catch (error) {
      console.log(error);
    }
  }

  // function -> all unread
  async function fetchAllUnreadNotification() {
    try {
      const result = await allNotificationsApi(token);
      setTotalNotification(result.length);
    } catch (error) {
      console.log(error);
    }
  }

  // function -> mark as read
  async function markAsReadHandler() {
    setNotModal({ heading: "All notifications" });
    try {
      await markAsReadNotificationApi(token);
      setTotalNotification(0);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffects
  useEffect(() => {
    fetchAllNotification();
    fetchAllUnreadNotification();
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 relative">
      {/* notification */}
      <button className="relative" onClick={markAsReadHandler}>
        <IoNotifications className="text-2xl text-richblack-50" />
        <div className="absolute top-0 translate-y-[-40%] bg-yellow-200 text-richblack-900 px-1 text-base translate-x-2 rounded-full">
          {totalNotification > 0 ? totalNotification : null}
        </div>
      </button>
      {/* search */}
      <button
        onClick={() => {
          setModalData({
            heading: "Search Modal",
          });
        }}
      >
        <IoSearchSharp className="text-2xl text-richblack-50" />
      </button>
      {/* chat */}
      <Link className="relative" to={`/chat/${123}/user/${123}`}>
        <BsChatDots className="text-2xl text-richblack-50 font-bold" />
        {/* <div className="absolute top-0 bg-pink-200 px-[6px] translate-x-3 translate-y-[-8px] rounded-full text-base">
          {totalItems}
        </div> */}
      </Link>
      {/* cart */}
      <Link className="relative" to={"/cart"}>
        <BsCart3 className="text-2xl text-richblack-50" />
        <div className="absolute top-0 bg-pink-200 px-[6px] translate-x-3 translate-y-[-8px] rounded-full text-base">
          {totalItems}
        </div>
      </Link>
      {/* Profile dropDown */}
      <ProfileDropDown />

      {modalData && (
        <SearchModal modalData={modalData} setModalData={setModalData} />
      )}
      {notModal && (
        <NotModal
          notModal={notModal}
          setNotModal={setNotModal}
          notification={notification}
          setTotalNotification={setTotalNotification}
          setNotification={setNotification}
        />
      )}
    </div>
  );
};

export default LoggedUser;
