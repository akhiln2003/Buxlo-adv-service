import { AdvResponseDto } from "../../dto/advResponse.dto";

export interface IFetchAdvUseCase{
    execute(page:number): Promise< {advs: AdvResponseDto[]; totalPages: number } | null>;
  }