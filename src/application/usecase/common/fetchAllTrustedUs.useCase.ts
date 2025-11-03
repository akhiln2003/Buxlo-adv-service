import { ITrustedUsRepository } from "../../../domain/interfaces/ITrustedUsRepository";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IFetchAllTrustedUsUseCase } from "../../interface/common/IFetchAllTrustedUsUseCase";

export class FetchAllTrustedUsUseCase implements IFetchAllTrustedUsUseCase {
  constructor(
    private _trustedUsRepository: ITrustedUsRepository,
    private _s3Service: IS3Service
  ) {}

  async execute(): Promise<string[] | []> {
    const keys = await this._trustedUsRepository.getAllAdvKey();

    if (keys.length) {
      return await Promise.all(
        keys.map((key) =>
          this._s3Service.getImageFromBucket(`TrustedUs/${key}`)
        )
      );
    }
    return [];
  }
}
