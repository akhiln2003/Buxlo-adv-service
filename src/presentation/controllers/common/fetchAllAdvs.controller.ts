import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchAllAdvUseCase } from "../../../application/interface/common/IFetchAllAdvUseCase";

export class FetchAllAdvController {
  constructor(private _fetchAllAdvUseCase: IFetchAllAdvUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const advs = await this._fetchAllAdvUseCase.execute();
      
      res.status(HttpStatusCode.OK).json(advs);
    } catch (error) {
      next(error);
    }
  };
}
