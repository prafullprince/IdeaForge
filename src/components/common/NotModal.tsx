import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NotModal = ({
  notModal,
  setNotModal,
  notification,
  setTotalNotification,
  setNotification
}: {
  notModal: any;
  setNotModal: any;
  notification: any;
  setTotalNotification: any
  setNotification: any
}) => {

  // store
  const { user } = useSelector((state: any) => state.profile);

  // socket state
  const [socket, setSocket] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  console.log(socket,connected)
  // socket
  useEffect(() => {
    const socket = new WebSocket("ws://study-hub-2.onrender.com");

    // open
    socket.onopen = () => {
      setConnected(true);
      socket.send(
        JSON.stringify({
          userId: user?._id,
          type: "register",
        })
      );
      console.log("connection open");
    };

    // message
    socket.onmessage = (message) => {
      console.log(message.data);
      const parsedData = JSON.parse(message.data);
      console.log(parsedData);
      setNotification((prev: any) => [...prev, parsedData]);
      setTotalNotification((prev:any) => prev + 1);
    };

    // error
    socket.onerror = () => {
      console.log("connection error");
    };

    // close
    socket.onclose = () => {
      console.log("connection closed");
      setConnected(false);
    };

    setSocket(socket);

    // memory cleanup
    return () => {
      socket.close();
      console.log("connection cleaned");
    };
  }, []);

  return (
    <div className="absolute h-[600px] w-[400px] top-[120%] right-[2%] bg-white bg-opacity-10 z-[1000] backdrop-blur-sm overflow-auto">
      <div className="flex items-center justify-center w-full mx-auto">
        <div className="flex flex-col gap-2 bg-pure-greys-700 p-6 relative border-richblack-400 rounded-lg">
          {/* heading */}
          <div className="bg-richblack-800 font-semibold text-pink-100 rounded-t-lg text-xl absolute top-0 w-full right-0 left-0 h-10 flex items-center justify-between px-6">
            {notModal.heading}
            <button
              onClick={() => setNotModal(null)}
              className="text-2xl text-pink-300"
            >
              X
            </button>
          </div>
          {/* all notifications */}
          <div className="flex gap-4 flex-col overflow-auto mt-8">
            {notification?.map((msg: any) => (
              <div key={msg?._id} className="flex gap-2 items-center">
                <img src={msg?.thumbnail} className="w-10 h-10 rounded-full" />
                <p className="text-richblack-25 text-sm">{msg?.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotModal;
