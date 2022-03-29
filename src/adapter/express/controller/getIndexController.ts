import { Request, Response } from 'express';

export class GetIndexController {
  public invoke(req: Request, res: Response): Response {
    return res.json({
      success: true,
      message: 'Hello Cognito Workshop Test1',
      timestamp: +new Date()
    });
  }
}
