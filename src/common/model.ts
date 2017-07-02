export type KeyObject = {[key:string]: string | number};

export interface Model {
    saveAsync(): Promise<void>;
    reloadAsync(): Promise<void>;
    deleteAsync(): Promise<void>;
    exists(): boolean;
    cancel();
    compare(other: Model): boolean;
    getKeys(): KeyObject;
}