import { WebSocket } from "ws";


// userConnection
export const userConnection = new Map<string,WebSocket>();


// register user online
export function registerUser(userId:any,ws: WebSocket){
    userConnection.set(userId,ws);
    console.log("user connected");
    const ws1 = userConnection.get(userId);
    if(ws1 && ws1.readyState === WebSocket.OPEN){
        ws1.send(JSON.stringify({
            type:"registered",
            payload:"User registered successfully"
        }))
    }
}


// sendMessage

