// import package
import express, { Application, Request, Response } from 'express';

// import database instances
import connectDB from './config/database';
import { cloudinaryConnect } from './config/cloudinary';

// import routes
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';

// import middleware package
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// websocket
import { WebSocket, WebSocketServer } from 'ws';
import { registerUser, userConnection } from './websocket/sendMessage';
import { createChat, createMessage, fetchMessage } from './controllers/chat';

// initialize port and app
const app: Application = express();
const PORT = process.env.PORT || 10000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);

// database connection
connectDB();
cloudinaryConnect();

// routes mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/course', courseRoutes);

// default routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

// port initialization
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// websocket server
const wss = new WebSocketServer({ server: httpServer });

// userConnection
// export const userConnections = new Map<string, WebSocket>();

// handle connection
wss.on('connection', function connection(socket: any) {
  // error handle
  socket.on('error', (err: any) => console.log(err));

  // message handle
  socket.on('message', function message(data: any, isBinary: any) {

    // parse data
    const body = JSON.parse(data);

    // register user
    if (body.type === 'register') {
      registerUser(body.userId, socket);
    } 

    // create message
    if(body.type === 'createMessage') {
      createMessage(body);
    }

    // fetch message
    if(body.type === 'fetchMessage') {
      fetchMessage(body);
    }
  });

  // close socket
  socket.on('close', () => {
    const userId = Array.from(userConnection.keys()).find(
      (key) => userConnection.get(key) === socket,
    );
    if (userId) userConnection.delete(userId);
    console.log('Client disconnected');
  });

  // connection message
  // socket.send('Hello : message from server!')
});
