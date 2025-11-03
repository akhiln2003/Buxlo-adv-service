export interface IFetchAllTrustedUsUseCase {
  execute(): Promise<string[]|[]>;
}
