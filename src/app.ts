import { errorHandler } from "@buxlo/common";
import { IServer } from "./domain/interfaces/IServer";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/mongodb/connection";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { AdminRouter } from "./presentation/routes/admin.routes";
import { CommonRouter } from "./presentation/routes/common.routes";

export class App {
  constructor(private _server: IServer) {}

  async initialize(): Promise<void> {
    await this._connectDB();
    this._registerMiddleware();
    this._registerRoutes();
    this._registerErrorHandler();
  }

  private _registerMiddleware(): void {
    this._server.registerMiddleware(loggerMiddleware);
  }
  private _registerRoutes(): void {
    const adminRoutes = new AdminRouter().getRouter();
    const commonRoutes = new CommonRouter().getRouter();

    this._server.registerRoutes("/api/adv/admin", adminRoutes);
    this._server.registerRoutes("/api/adv/common", commonRoutes);
  }

  private _registerErrorHandler(): void {
    this._server.registerErrorHandler(errorHandler);
  }

  async start(port: number): Promise<void> {
    await this._server.start(port);
  }

  async shutdown(): Promise<void> {
    await disconnectDB();
    console.log("Shut dow server");
  }
  private async _connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }
}
