import { useEffect, useState } from "react"
import { Input } from "../components/ui/input";
import { useSelector } from "react-redux";

const ContactPage = () => {

  // store
  const { user } = useSelector((state:any)=>state.profile);

  // state
  const [socket,setSocket] = useState<WebSocket | null>(null);
  // const [message,setMessage] = useState<string[]>([]);
  const [isConnected,setConnected] = useState(false);
  const [latestMessage,setLatestMessage] = useState("");
  const [chat,setChat] = useState<string>("");

  useEffect(()=>{

    // fetch socketApi like fetch
    const socket = new WebSocket('wss://study-hub-2.onrender.com');

    // when socket is open
    socket.onopen = () =>{
      setConnected(true);
      socket.send(user?._id);
    }

    // all message hadler
    socket.onmessage = (message)=>{
      // setMessage(m => [...m,message.data]);
      console.log(message.data)
      setLatestMessage(message.data);
    }

    // onerror
    socket.onerror = (error)=>{
      console.log(error);
    }

    // onclose
    socket.onclose = ()=>{
      console.log('connection closed');
      setConnected(false);
    }

    setSocket(socket);

    // cleanup function
    return ()=>{
      socket.close();
      console.log("closed during cleanup")
    }

  },[]);

  if(!isConnected){
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen overflow-y-auto flex justify-center items-center flex-col gap-2'>
      Connected to the websocket server: 
      {latestMessage}
      <p> all message: </p>
      {/* <div>
        {message?.map((msg,index)=>(
          <p key={index}>{msg}</p>
        ))}
      </div> */}
      <div>

      </div>
      <div className="mt-12">
        <Input 
          type="text"
          name="chat"
          value={chat}
          onChange={(e:any)=> setChat(e.target.value)}
        />
        <button className="mt-2" onClick={()=>{
          socket?.send(chat);
        }}>Send</button>
      </div>
    </div>
  )
}

export default ContactPage
