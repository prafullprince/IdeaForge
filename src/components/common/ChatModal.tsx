import { useSelector } from "react-redux";
import { createChat } from "../../services/apiCall/chat";
import { useEffect, useRef } from "react";

const ChatModal = ({ users, setCreateChatModal, setRefresh }: any) => {
  // store
  const { user } = useSelector((state: any) => state.profile);
  const { token } = useSelector((state: any) => state.auth);

  // hook
  const divRef = useRef<HTMLDivElement | null>(null);

  // create Chat handler
  async function createChatHandler(receiverId: any) {
    try {
      await createChat(user?._id, receiverId, token);
      setRefresh((prev:any)=> !prev)
      setCreateChatModal(null);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect
  useEffect(() => {
    // clickOutside
    function clickOutside(e:MouseEvent) {
        if(divRef.current && !divRef.current.contains(e.target as Node)){
            setCreateChatModal(null);
        }
    }

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-[1000] backdrop-blur-sm">
      <div className="flex items-center justify-center h-screen mx-auto">
        <div
          ref={divRef}
          className="flex flex-col gap-2 bg-richblack-800 p-6 relative border-richblack-400 rounded-lg w-[90%] md:w-[60%]"
        >
          <div className="flex flex-col gap-4">
            {users?.map((usery: any) => (
              <button
                key={usery?._id}
                onClick={() => createChatHandler(usery?._id)}
                className="flex gap-4 items-center hover:bg-richblack-900 duration-200 transition-all px-4 py-3 rounded-lg"
              >
                <img src={usery?.image} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col items-start">
                  <p className="text-base text-richblack-25">{usery?.name}</p>
                  <p className="text-sm text-richblack-400">{usery?.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
