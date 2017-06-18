export interface Model {
    saveAsync(): Promise<void>;
    reloadAsync(): Promise<void>;
    cancelAsync(): Promise<void>;
}