export interface IFetchAllAdvUseCase {
  execute(): Promise<string[]|[]>;
}
