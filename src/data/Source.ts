import { Model } from "./Model";
import { Observable } from "rxjs/Observable";

export interface Source<T extends Model> {
    addAsync(item: T): Promise<void>;
    removeAsync(item: T): Promise<void>;
    syncAsync(): Promise<void>;
    observe(): Observable<T[]>;
}