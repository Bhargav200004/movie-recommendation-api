import { config } from 'dotenv';
config();

import express, { Express }  from 'express';
import { json } from 'body-parser';

import appRouter from '@src/routes/appRoutes';
import globalErrorHandlerMiddleware from './middleware/globalErrorHandler.middleware';

const app : Express = express();

const port = 9000;

app.use(json());
app.use('/' , appRouter);
app.use(globalErrorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})

