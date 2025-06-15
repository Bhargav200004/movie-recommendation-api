import ApiResponse from '@/library/globalApiResponse';
import { Router, Request, Response } from 'express';


const appRouter: Router = Router();

appRouter.get('/Welcome', async (_req: Request, res: Response) => {
  const response = new ApiResponse(true , "Hello World" , {"Data" : "Hello World"})
  res.status(200).json(response);
});

export default appRouter;
