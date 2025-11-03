import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IFetchAllAdvUseCase } from "../../interface/common/IFetchAllAdvUseCase";

export class FetchAllAdvUseCase implements IFetchAllAdvUseCase {
  constructor(
    private _advRepository: IAdvRepository,
    private _s3Service: IS3Service
  ) {}

  async execute(): Promise<string[] | []> {
    const keys = await this._advRepository.getAllAdvKey();
    if (keys.length) {
      return await Promise.all(
        keys.map((key) => this._s3Service.getImageFromBucket(`Adv/${key}`))
      );
    }
    return [];
  }
}
