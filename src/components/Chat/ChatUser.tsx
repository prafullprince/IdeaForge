import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userDetailsById } from "../../services/apiCall/profile";
import { IoSendSharp } from "react-icons/io5";
import wspLogo from "../../assets/Images/Black Mode whatsapp.jpeg";
import FullPage from "../../spinner/FullPage";


const ChatUser = () => {
  // hook
  const { chatId, userId } = useParams();
  const divRef = useRef<null | HTMLDivElement>(null);

  // store
  const { user } = useSelector((state: any) => state.profile);
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any>([]);
  const [chat, setChat] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading,setLoading] = useState<boolean>(true);
  const [userLoading,setUserLoading] = useState<boolean>(false);

  // apiCall -> allMessage
  useEffect(() => {
    const socket = new WebSocket("wss://study-hub-2.onrender.com");

    // open
    socket.onopen = () => {
      if (user?._id) {
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
      }
    };

    // onMessage
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      // fetching chat
      if (data?.type === "fetchMessage") {
        setMessage(data?.payload);
        setLoading(false);
      }

      // receiving chat
      if (data?.type === "recieveMessage") {
        setMessage((prev: any) => [...prev, data?.payload]);
      }
    };

    // error
    socket.onerror = () => {
      
    };

    // close
    socket.onclose = () => {
     
    };

    setSocket(socket);

    // cleanup
    return () => {
      socket.close();
    };
  }, [chatId, userId,user]);

  // new message in view
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // userDetails fetched
  useEffect(() => {
    async function fetchUserDetails() {
      setUserLoading(true);
      try {
        const result = await userDetailsById(userId, token);
        setUserInfo(result);
      } catch (error) {
        console.log(error);
      }
      setUserLoading(false);
    }
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="flex flex-col relative w-full min-h-[835px] max-h-[calc[100vh-3.5rem]] overflow-auto">
      {/* topbar */}
      <div className="">
        <div className="bg-[#202c33] p-4 flex gap-4 break-words text-wrap sticky top-0 left-0 right-0">
          {userLoading ? (<div className="min-w-10 min-h-10 w-10 h-10 max-w-10 max-h-10 div"></div>) : 
          (<img
            src={userInfo?.userDetails?.image}
            className="min-w-10 min-h-10 w-10 h-10 rounded-full"
          />)}
          <div className="flex flex-col items-start break-words text-wrap">
            <p className="text-base text-richblack-5 font-semibold">
              {userInfo?.userDetails?.name}
            </p>
            <p className="text-xs text-richblack-100 break-words text-wrap">
              {userInfo?.userDetails?.email}
            </p>
          </div>
        </div>
      </div>

      {/* message box */}
      {loading ? (<FullPage />) : 
      (<div
        className={`max-h-[700px] min-h-[700px] p-4 md:mt-0 overflow-auto bg-pure-greys-800 bg-center bg-cover`}
        style={{ backgroundImage: `url(${wspLogo})` }}
      >
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
                  <div className="flex break-words text-wrap justify-start">
                    <div className="w-auto relative max-w-[75%] md:max-w-[65%] bg-[#1d2930] px-3 text-richblue-5 py-1 rounded-lg rounded-tl-none break-words text-wrap">
                      <div className="absolute left-0 top-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-[#1d2930] w-0 h-0 rotate-180 translate-x-[-8px] translate-y-0"></div>
                      <div className="break-words text-wrap relative">
                        <div className="pr-10 pb-2">{msg?.text}</div>
                        <span className="text-right text-xs text-richblack-25 font-bold absolute bottom-0 right-0">
                          {new Date(msg?.createdAt).toLocaleString("en-us", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }) === "Invalid Date" ? (
                            <>23:59</>
                          ) : (
                            <>
                              {new Date(msg?.createdAt).toLocaleString(
                                "en-us",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* sender */}
                {msg?.sender?._id === user?._id && (
                  <div className="flex break-words text-wrap justify-end">
                    <div className="w-auto relative max-w-[75%] md:max-w-[65%] bg-[#144a4b] px-3 text-richblue-5 py-1 rounded-lg rounded-tr-none break-words text-wrap">
                      <div className="absolute right-0 top-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-[#144a4b] w-0 h-0 rotate-90 translate-x-2 translate-y-0"></div>
                      <div className="break-words text-wrap relative">
                        <div className="pr-10 pb-2">{msg?.text}</div>
                        <span className="text-right text-xs text-richblack-25 font-bold absolute bottom-0 right-0">
                          {new Date(msg?.createdAt).toLocaleString("en-us", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }) === "Invalid Date" ? (
                            <>23:59</>
                          ) : (
                            <>
                              {new Date(msg?.createdAt).toLocaleString(
                                "en-us",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div ref={divRef}></div>
      </div>)}

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
          {chat && (
            <button
              className="bg-[#00a884] hover:bg-[#009272] text-white px-4 py-1 rounded-lg text-2xl"
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
              <IoSendSharp className="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
