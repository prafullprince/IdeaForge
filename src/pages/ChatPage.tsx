import { Outlet } from "react-router-dom";
import ChatSidebar from "../components/Chat/ChatSidebar";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { setIsOpenChatSidebar } from "../slices/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatPage = () => {
  // hook
  const dispatch = useDispatch();
  const { isOpenChatSidebar } = useSelector((state: any) => state.global);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // sideEffect
  useEffect(() => {
    function clickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(setIsOpenChatSidebar(false));
      }
    }

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="w-screen relative bg-richblack-900 min-h-[835px] max-h-[calc-[100vh-3.5rem]] overflow-auto">
      <button
        onClick={() => {
          dispatch(setIsOpenChatSidebar());
        }}
        className="text-3xl font-semibold absolute top-5 z-[100] right-6"
      >
        <BsLayoutTextSidebar
          className={`${
            isOpenChatSidebar ? "text-richblack-200" : "text-yellow-50"
          }`}
        />
      </button>
      {/* box */}
      <div className="">
        {/* content box */}
        <div className="flex relative">
          {/* sidebar */}
          <div
            ref={sidebarRef}
            className={`absolute left-0 top-0 border-r border-r-richblack-700 z-[1000] transform transition-transform duration-300 ${
              isOpenChatSidebar ? "translate-x-0" : "translate-x-[-400px]"
            }`}
          >
            <ChatSidebar />
          </div>
          {/* chatUser */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
