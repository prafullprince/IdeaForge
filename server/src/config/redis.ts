import Redis from 'ioredis';
import { configDotenv } from 'dotenv';
configDotenv();


const client = new Redis(
 process.env.REDIS_URL!
);
// if(!process.env.REDIS_URL){
//   throw new Error('Redis url not found')
// }

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default client;
