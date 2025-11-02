import { AdvResponseDto } from "../../dto/advResponse.dto";

export interface IQueryData {
  title?: string;
  description?: string;
  id?: string;
  currentImage?: string;
  image?:string;
}

export interface IEditAdvUseCase {
  execute(data: IQueryData, file: any): Promise<AdvResponseDto>;
}
