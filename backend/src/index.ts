import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkWebhookHandler } from './webhooks/clerk';
import { clerkMiddleware } from '@clerk/express';
import { getEnv } from './lib/env';

const env = getEnv();
const app = express();

const rawJson = express.json({
    type: 'application/json',
    limit: '2mb',
})

app.post("/webhooks/clerk",rawJson, (req,res) => {
    void clerkWebhookHandler(req,res);
})

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(env.PORT, ()=> console.log('Server is running on port 3001'));