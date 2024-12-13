// types.d.ts or express.d.ts
import * as express from 'express';

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | undefined;
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
