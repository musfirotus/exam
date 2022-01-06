require('dotenv').config();
import * as Queue from 'bull';
import { Job } from 'bull';

const sendEmailQueue = new Queue('send-email', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});

sendEmailQueue.process(async (job: Job) => {
  try {
    console.log('put your queue jobs here');
  } catch (error) {
    throw error;
  }
});
