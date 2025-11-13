import { IS3Service } from "../@types/IS3Service";
import { S3Service } from "../external-services/s3-client";
import { CreateTurstedUsUsecase } from "../../application/usecase/admin/CreateTurstedUs.usecase";
import { CreateAdvUsecase } from "../../application/usecase/admin/CreateAdv.usecase";
import { AdvRepository } from "../repositories/advRepositary";
import { TrustedUsRepository } from "../repositories/trustedUsRepositary";
import { FetchtrustedUsUseCase } from "../../application/usecase/admin/fetchtrustedUs.useCase";
import { FetchS3ImageUseCase } from "../../application/usecase/common/fetchS3Image.useCase";
import { DeleteTrustedUsUseCase } from "../../application/usecase/admin/DeleteTrustedUs.useCase";
import { FetchAdvUseCase } from "../../application/usecase/admin/fetchAdv.useCase";
import { DeleteAdvUseCase } from "../../application/usecase/admin/DeleteAdv.useCase";
import { EditAdvUseCase } from "../../application/usecase/admin/EditAdv.useCase";
import { FetchAllTrustedUsUseCase } from "../../application/usecase/common/fetchAllTrustedUs.useCase";
import { FetchRandomAdvUseCase } from "../../application/usecase/common/fetchRandomAdbs.useCase";

export class DIContainer {
  private _s3Service: IS3Service;
  private _advRepository: AdvRepository;
  private _trustedUsRepository: TrustedUsRepository;

  constructor() {
    this._s3Service = new S3Service();
    this._advRepository = new AdvRepository();
    this._trustedUsRepository = new TrustedUsRepository();
  }

  fetchTrustedUsUseCase() {
    return new FetchtrustedUsUseCase(this._trustedUsRepository);
  }
  fetchAllTrustedUsUseCase() {
    return new FetchAllTrustedUsUseCase(
      this._trustedUsRepository,
      this._s3Service
    );
  }
  fetchAdvUseCase() {
    return new FetchAdvUseCase(this._advRepository);
  }

  fetchRandomAdvUseCase() {
    return new FetchRandomAdvUseCase(this._advRepository, this._s3Service);
  }

  fetchS3ImageUseCase() {
    return new FetchS3ImageUseCase(this._s3Service);
  }

  deleteAdvUseCase() {
    return new DeleteAdvUseCase(this._advRepository, this._s3Service);
  }
  editAdvUseCase() {
    return new EditAdvUseCase(this._advRepository, this._s3Service);
  }

  deleteTrustedUsUseCase() {
    return new DeleteTrustedUsUseCase(
      this._trustedUsRepository,
      this._s3Service
    );
  }

  createTurstedUsUsecase() {
    return new CreateTurstedUsUsecase(
      this._s3Service,
      this._trustedUsRepository
    );
  }
  createAdvUsecase() {
    return new CreateAdvUsecase(this._s3Service, this._advRepository);
  }
}
