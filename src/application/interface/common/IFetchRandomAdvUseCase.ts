import { AdvResponseDto } from "../../dto/advResponse.dto";

export interface IFetchRandomAdvUseCase {
  execute(): Promise<AdvResponseDto>;
}
