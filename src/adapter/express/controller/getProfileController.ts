import { Request, Response } from 'express';
import { ObtainProfile } from '@domain/useCase';

export class GetProfileController {
  constructor(private obtainProfile: ObtainProfile) {}

  public async invoke(req: Request, res: Response): Promise<Response | void> {
    res.status(200).json(await this.obtainProfile.invoke());
  }
}
