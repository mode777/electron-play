export type KeyObject = {[key:string]: string | number};

export interface Model {
    saveAsync(): Promise<void>;
    reloadAsync(): Promise<void>;
    deleteAsync(): Promise<void>;
    existsAsync(): Promise<boolean>;
    cancel(): Promise<void>;
    compare(other: Model): boolean;
    getKeys(): KeyObject;
}