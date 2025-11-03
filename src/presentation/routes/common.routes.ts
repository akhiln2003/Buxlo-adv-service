import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchAllAdvController } from "../controllers/common/fetchAllAdvs.controller";
import { FetchAlltrustedusController } from "../controllers/common/fetchAlltrustedus.controller";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _fetchAllAdvController!: FetchAllAdvController;
  private _fetchAlltrustedusController!: FetchAlltrustedusController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchAllAdvController = new FetchAllAdvController(
      this._diContainer.fetchAllAdvUseCase()
    );
    this._fetchAlltrustedusController = new FetchAlltrustedusController(
      this._diContainer.fetchAllTrustedUsUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get("/fetchalladvs", this._fetchAllAdvController.fetchData);
    this._router.get(
      "/fetchalltrustedus",
      this._fetchAlltrustedusController.fetchData
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
