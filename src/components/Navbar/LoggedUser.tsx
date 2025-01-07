import { BsCart3 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import ProfileDropDown from "./ProfileDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import SearchModal from "../common/SearchModal";
import { IoNotifications } from "react-icons/io5";
import NotModal from "../common/NotModal";
import {
  allNotificationsApi,
  allUserNotificationsApi,
  markAsReadNotificationApi,
} from "../../services/apiCall/extra";
import { BsChatDots } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { fetchAllCategoryApi } from "../../services/apiCall/category";

interface ICategory {
  _id: string;
  categoryName: string;
  CategoryDesc: string;
}

const LoggedUser = () => {
  // store
  const { totalItems } = useSelector((state: any) => state.cart);
  const { token } = useSelector((state: any) => state.auth);
  const { user } = useSelector((state: any) => state.profile);
  const prevCategoriesRef = useRef<ICategory[]>([]);
  console.log("user", user);
  // state
  const [modalData, setModalData] = useState<any>(null);
  const [notModal, setNotModal] = useState<any>(null);
  const [notification, setNotification] = useState<any>([]);
  const [totalNotification, setTotalNotification] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<ICategory[]>([]);

  // apiCall -> fetchAllCategory
  useEffect(() => {
    async function fetchAllCategory() {
      setLoading(true);
      try {
        // apiCall
        const result = await fetchAllCategoryApi();
        if (JSON.stringify(result) !== JSON.stringify(prevCategoriesRef)) {
          setAllCategory(result);
          prevCategoriesRef.current = result;
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchAllCategory();
  }, []);

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
      {/* catalog */}
      <div className="relative flex items-center gap-[2px] cursor-pointer group">
        <IoMdArrowDropdown className="text-3xl" />
        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-60%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 text-richblack-900 opacity-0 transition-all  duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] px-2 py-4 gap-1">
          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              {allCategory?.length === 0 ? (
                <>No category found</>
              ) : (
                <>
                  {allCategory?.map((cat) => (
                    <Link
                      to={`/catalog/${cat?.categoryName
                        ?.split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="text-black py-2 px-4 hover:bg-richblack-700 hover:text-white rounded-lg flex items-center transition-all duration-200"
                      key={cat._id}
                    >
                      {cat?.categoryName}
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
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
      <Link
        className="relative"
        to={`/chat/${
          user?.chats?.[0]?._id
        }/user/${user?.chats?.[0]?.participants?.find(
          (chatter: any) => chatter !== user?._id
        )}`}
      >
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
