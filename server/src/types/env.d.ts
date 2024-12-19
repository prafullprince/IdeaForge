// types.d.ts or express.d.ts
import * as express from 'express';
import fileUpload from "express-fileupload";

interface UserPayload {
  id: string;
  email: string;
  accountType: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | undefined;
      files?: fileUpload | null
    }
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    MONGO_URI: string;
    JWT_SECRET: string;
  }
}
