import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { AdvMapper, AdvResponseDto } from "../../dto/advResponse.dto";
import { IFetchRandomAdvUseCase } from "../../interface/common/IFetchRandomAdvUseCase";

export class FetchRandomAdvUseCase implements IFetchRandomAdvUseCase {
  constructor(
    private _advRepository: IAdvRepository,
    private _s3Service: IS3Service
  ) {}

  async execute(): Promise<AdvResponseDto> {
    const adv = await this._advRepository.getRandomAdv();

    const imageUrl = adv.image
      ? await this._s3Service.getImageFromBucket(`Adv/${adv.image}`)
      : "";

    return AdvMapper.toDto({
      ...adv,
      image: imageUrl,
    });
  }
}
