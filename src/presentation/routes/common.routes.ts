import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchAlltrustedusController } from "../controllers/common/fetchAlltrustedus.controller";
import { FetchRandomAdvController } from "../controllers/common/fetchRandomAdvs.controller";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _fetchRandomAdvController!: FetchRandomAdvController;
  private _fetchAlltrustedusController!: FetchAlltrustedusController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchRandomAdvController = new FetchRandomAdvController(
      this._diContainer.fetchRandomAdvUseCase()
    );
    this._fetchAlltrustedusController = new FetchAlltrustedusController(
      this._diContainer.fetchAllTrustedUsUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchrandomadvs",
      this._fetchRandomAdvController.fetchData
    );
    this._router.get(
      "/fetchalltrustedus",
      this._fetchAlltrustedusController.fetchData
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
