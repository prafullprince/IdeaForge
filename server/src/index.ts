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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
