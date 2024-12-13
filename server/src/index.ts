import express, { Application, Request, Response } from 'express';
import connectDB from './config/database';
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";

// initialize port and app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials:true
}));

// database connection
connectDB();

// routes mounting
app.use("/api/v1/auth",authRoutes);

// default routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript!');
});

// port initialization
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
