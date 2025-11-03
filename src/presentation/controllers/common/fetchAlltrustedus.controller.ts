import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchAllTrustedUsUseCase } from "../../../application/interface/common/IFetchAllTrustedUsUseCase";

export class FetchAlltrustedusController {
  constructor(private _fetchAlltrustedUsUseCase: IFetchAllTrustedUsUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trustedUs = await this._fetchAlltrustedUsUseCase.execute();

      res.status(HttpStatusCode.OK).json(trustedUs);
    } catch (error) {
      next(error);
    }
  };
}
