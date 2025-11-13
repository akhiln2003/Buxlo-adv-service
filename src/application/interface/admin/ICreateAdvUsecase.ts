import { AdvResponseDto } from "../../dto/advResponse.dto";

export interface ICreateAdvData {
   image: string,
   title: string,
   description: string,
   link:string,
   id?: string,
}

export interface ICreateAdvUsecase {
  execute(updatedData: ICreateAdvData, file: any): Promise<AdvResponseDto>;
}
