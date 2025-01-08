import { WebSocket } from "ws";


// userConnection
export const chatRoom = new Map<string, Map<string,WebSocket>>();


// register user online
export function registerUser(userId:any,chatId:any,ws: WebSocket){
    if(!chatRoom.get(chatId)){
        chatRoom.set(chatId, new Map);
    }

    const chatParticipants = chatRoom.get(chatId);
    chatParticipants?.set(userId,ws);
    console.log("user connected");
    const ws1 = chatParticipants?.get(userId);
    if(ws1 && ws1.readyState === WebSocket.OPEN){
        ws1.send(JSON.stringify({
            type:"registered",
            payload:"User registered successfully"
        }))
    }
}


// sendMessage

