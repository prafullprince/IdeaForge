// import package
import express, { Application, Request, Response } from 'express';

// import database instances
import connectDB from './config/database';
import { cloudinaryConnect } from './config/cloudinary';

// import routes
import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";

// import middleware package
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from 'express-fileupload';

// websocket
import { WebSocket, WebSocketServer } from 'ws';

// initialize port and app
const app: Application = express();
const PORT = process.env.PORT || 10000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// database connection
connectDB();
cloudinaryConnect();

// routes mounting
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/course",courseRoutes);

// default routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript!');
});

// port initialization
const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// websocket server
const wss = new WebSocketServer({ server:httpServer });

// userConnection
export const userConnections = new Map<string, WebSocket>();

// handle connection
wss.on('connection',function connection(socket){
    // error handle
    socket.on('error',(err)=> console.log(err));

    // message handle
    socket.on('message', function message(data,isBinary){
        try {
            const userId = data.toString();
            if(userId){
                userConnections.set(userId,socket);
                console.log('user connected')
            }
        } catch (error) {
            console.log(error);
        }
        // wss.clients.forEach(function each(client){
        //     if(client.readyState === WebSocket.OPEN){
        //         client.send(data,{binary: isBinary});
        //     }
        // })
    })

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    // connection message
    // socket.send('Hello : message from server!')
});
