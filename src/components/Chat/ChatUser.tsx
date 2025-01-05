import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userDetailsById } from "../../services/apiCall/profile";
import { IoSendSharp } from "react-icons/io5";


const ChatUser = () => {
  // hook
  const { chatId, userId } = useParams();

  // store
  const { user } = useSelector((state: any) => state.profile);
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any>([]);
  const [chat, setChat] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  console.log(userInfo);

  // apiCall -> allMessage
  useEffect(() => {
    const socket = new WebSocket("ws://study-hub-2.onrender.com");

    // open
    socket.onopen = () => {
      // register user
      socket.send(
        JSON.stringify({
          type: "register",
          userId: user?._id,
        })
      );

      // fetchAllMessageAvailable in this chat
      socket.send(
        JSON.stringify({
          type: "fetchMessage",
          payload: { chatId: chatId, sender: user?._id },
        })
      );
    };

    // onMessage
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      // fetching chat
      if (data?.type === "fetchMessage") {
        setMessage(data?.payload);
      }

      // receiving chat
      if (data?.type === "recieveMessage") {
        setMessage((prev: any) => [...prev, data?.payload]);
      }
    };

    // error
    socket.onerror = () => {
      console.log("socket error");
    };

    // close
    socket.onclose = () => {
      console.log("socket closed");
    };

    setSocket(socket);

    // cleanup
    return () => {
      socket.close();
    };
  }, [chatId]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const result = await userDetailsById(userId, token);
        setUserInfo(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="flex flex-col relative w-full">
      {/* topbar */}
      <div className="bg-[#202c33] p-4 flex gap-4">
        <img
          src={userInfo?.userDetails?.image}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col items-start">
          <p className="text-base text-richblack-5 font-semibold">
            {userInfo?.userDetails?.name}
          </p>
          <p className="text-xs text-richblack-100">
            {userInfo?.userDetails?.email}
          </p>
        </div>
      </div>

      {/* message box */}
      <div className="h-[700px] p-4 overflow-auto bg-pure-greys-800">
        {/*  */}
        {message?.length === 0 ? (
          <div className="flex items-center justify-center">
            No message found. Let's chat
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {message?.map((msg: any) => (
              <div key={msg?._id} className="flex flex-col gap-1">
                {/* receiver */}
                {msg?.receiver?._id === user?._id && (
                  <div className="flex w-full justify-start">
                    <div className="w-fit flex gap-2 bg-[#202C33] px-2 py-1 rounded-lg">
                      <img
                        src={msg?.sender?.image}
                        className="w-6 h-6 rounded-full"
                      />
                      <p>{msg?.text}</p>
                    </div>
                  </div>
                )}
                {/* sender */}
                {msg?.sender?._id === user?._id && (
                  <div className="flex w-full justify-end">
                    <div className="w-fit flex gap-2 bg-[#056162] px-2 py-1 rounded-lg">
                      <img
                        src={msg?.sender?.image}
                        className="w-6 h-6 rounded-full"
                      />
                      <p>{msg?.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* send message */}
      <div className="w-full bg-[#202c33] px-12">
        <div className="flex gap-4 items-center mx-auto w-full my-2">
          <input
            type="text"
            name="chat"
            value={chat}
            onChange={(e: any) => setChat(e.target.value)}
            placeholder="Type a message"
            className="bg-[#050301] w-full h-12 outline-none rounded-lg px-4 placeholder:px-2 placeholder:font-extralight placeholder:text-base"
          />
          {
            chat && <button
            onClick={() => {
              socket?.send(
                JSON.stringify({
                  type: "createMessage",
                  payload: {
                    chatId: chatId,
                    sender: user?._id,
                    receiver: userId,
                    text: chat,
                  },
                })
              );
              setChat("");
            }}
          >
            <IoSendSharp className="font-semibold text-3xl" />
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
