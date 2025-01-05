import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userDetails } from "../../services/apiCall/profile";
import { useSelector } from "react-redux";
import ChatModal from "../common/ChatModal";
import { fetchAllChat } from "../../services/apiCall/chat";
import { setChatter } from "../../slices/globalSlice";
import { MdCreateNewFolder } from "react-icons/md";


const ChatSidebar = () => {
  // store
  const { token } = useSelector((state: any) => state.auth);
  const { user } = useSelector((state:any)=> state.profile);

  // hook
  const { userId } = useParams();
  const navigate = useNavigate();

  // state
  const [users, setUsers] = useState<any>([]);
  const [createChatModal, setCreateChatModal] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [chat, setChat] = useState<any>([]);

  // fetchAllFollowers
  async function fetchAllFollowers() {
    try {
      const result = await userDetails(token);
      setUsers(result?.followers);
    } catch (error) {
      console.log(error);
    }
  }

  // function fetchAllChat
  async function fetchAllChats() {
    try {
      const result = await fetchAllChat(token);
      setChat(result?.chats);
    } catch (error) {
      console.log(error);
    }
  }

  // sideEffect -> apiCall
  useEffect(() => {
    fetchAllFollowers();
  }, []);

  useEffect(() => {
    fetchAllChats();
  }, [refresh]);

  return (
    <div className="min-w-[400px] bg-[#111B21] px-4">
      {/* create chat */}
      <div className="flex justify-between items-center border-b border-b-richblack-500 border-opacity-60 py-4">
        <p className="text-3xl font-semibold">Chats</p>
        <button
          onClick={() => {
            setCreateChatModal({
              heading: "Chat Modal",
            });
          }}
          className="bg-yellow-100 text-richblack-900 px-2 py-1 rounded-lg flex items-center gap-1"
        >
          <MdCreateNewFolder className="text-3xl font-bold" />
          <p className="font-medium text-lg">Chat</p>
        </button>
      </div>

      {/* allChats */}
      <div className="flex flex-col gap-2 mt-12 overflow-auto">
        {chat?.map((chit: any) => (
          <button onClick={()=>{
            setChatter(chit);
            navigate(`/chat/${chit?._id}/user/${chit?.participants?.find((chatter:any)=> chatter?._id !== user?._id )?._id}`)
          }}
            key={chit?._id}
            className={`flex gap-4 items-center ${chit?.participants?.find((chatter:any)=> chatter?._id !== user?._id )?._id === userId ? "bg-richblack-700" : ""} hover:bg-richblack-600 duration-200 transition-all px-4 py-3 rounded-lg`}
          >
            <img src={chit?.participants?.find((chatter:any)=> chatter?._id !== user?._id )?.image} className="w-10 h-10 rounded-full" />
            <div className="flex flex-col items-start">
              <p className="text-base text-richblack-25">{chit?.participants?.find((chatter:any)=> chatter?._id !== user?._id )?.name}</p>
              <p className="text-sm text-richblack-400">{chit?.participants?.find((chatter:any)=> chatter?._id !== user?._id )?.email}</p>
            </div>
          </button>
        ))}
      </div>
      {createChatModal && (
        <ChatModal
          users={users}
          setCreateChatModal={setCreateChatModal}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ChatSidebar;
