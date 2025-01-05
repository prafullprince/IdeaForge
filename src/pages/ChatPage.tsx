import { Outlet } from "react-router-dom"
import ChatSidebar from "../components/Chat/ChatSidebar"

const ChatPage = () => {
  return (
    <div className="w-full">
        {/* box */}
        <div className="">
            {/* content box */}
            <div className="flex">
                {/* sidebar */}
                <ChatSidebar />
                {/* chatUser */}
                <div className="w-full">
                  <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage
