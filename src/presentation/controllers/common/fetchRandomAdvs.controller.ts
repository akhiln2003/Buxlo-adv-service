import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchRandomAdvUseCase } from "../../../application/interface/common/IFetchRandomAdvUseCase";

export class FetchRandomAdvController {
  constructor(private _fetchRandomAdvUseCase: IFetchRandomAdvUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const advs = await this._fetchRandomAdvUseCase.execute();

      res.status(HttpStatusCode.OK).json(advs);
    } catch (error) {
      next(error);
    }
  };
}
