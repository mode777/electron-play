import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { Model } from "./model";
import { Source } from "./source";

export abstract class BaseSource<TModel extends Model> implements Source<TModel> {

    private _data: TModel[];
    private readonly _subject = new ReplaySubject<TModel[]>(1);
    private _initialized = false;

    async addAsync(item?: TModel): Promise<void> {
        const model = item || (await this.createModelAsync());  
        this._data.push(model);
        this._subject.next(this._data); 
    }

    async removeAsync(item: TModel): Promise<void> {
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
    
    observe(): Observable<TModel[]> {
        if(!this._initialized){
            this.syncAsync();
            this._initialized = true;
        }
        return this._subject;
    }

    protected abstract createModelAsync(): Promise<TModel>;
    protected abstract loadDataAsync(): Promise<TModel[]>;
    protected abstract deleteItemAsync(item: TModel): Promise<void>;
}