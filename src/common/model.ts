export interface Model {
    saveAsync(): Promise<void>;
    reloadAsync(): Promise<void>;
}