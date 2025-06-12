import { config } from 'dotenv';
config();

import express, { Express , Request , Response}  from 'express';
const app : Express = express();

const port = 9000;

app.get('/' , (_req : Request  , res : Response) => {
    res.status(200).json({
        message: 'Hello World'
    });
})

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})

