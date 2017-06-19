import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { Model } from "./model";
import { Source } from "./source";

export abstract class BaseSource<T extends Model> implements Source<T> {

    private _data: T[];
    private readonly _subject = new ReplaySubject<T[]>(1);
    private _initialized = false;

    async addAsync(item?: T): Promise<void> {
        const model = item || (await this.createModelAsync());  
        this._data.push(model);
        this._subject.next(this._data); 
    }

    async removeAsync(item: T): Promise<void> {
        await this.deleteItemAsync(item);
        const idx = this._data.indexOf(item);
        if(idx !== -1)
            this._data.splice(idx, 1);

        this._subject.next(this._data);
    }
    
    async syncAsync(): Promise<void> {
        this._data = await this.loadDataAsync();
        this._subject.next(this._data);
    }
    
    observe(): Observable<T[]> {
        if(!this._initialized){
            this.syncAsync();
            this._initialized = true;
        }
        return this._subject;
    }

    protected abstract createModelAsync(): Promise<T>;
    protected abstract loadDataAsync(): Promise<T[]>;
    protected abstract deleteItemAsync(item: T): Promise<void>;
}