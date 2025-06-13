import { Router, Request, Response } from 'express';

const appRouter: Router = Router();

appRouter.get('/Welcome', async (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

export default appRouter;
