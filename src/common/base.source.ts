import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { Model } from "./model";
import { Source } from "./source";

export abstract class BaseSource<TModel extends Model, TEntity extends {}> implements Source<TModel> {

    private _data: TModel[] = [];
    private readonly _subject = new ReplaySubject<TModel[]>(1);
    private _initialized = false;

    async addAsync(item?: TModel): Promise<void> {
        const model = item || (await this.modelFromEntity());  
        if(!item.exists()){
            await item.saveAsync();
        }
        this._data.push(model);
        this._subject.next(this._data); 
    }

    async removeAsync(item: TModel): Promise<void> {
        const idx = this._data.indexOf(item);
        if(idx !== -1){
            this._data.splice(idx, 1);
            await item.deleteAsync();
        }
        else {
            return;
        }
        this._subject.next(this._data);
    }
    
    async reloadAsync(): Promise<void> {
        const entities = await this.loadEntitiesAsync();
        this._data = entities.map(x => this.modelFromEntity(x));
        this._subject.next(this._data);
    }
    
    getObservable(): Observable<TModel[]> {
        if(!this._initialized){
            this.reloadAsync();
            this._initialized = true;
        }
        return <Observable<TModel[]>>this._subject;
    }

    async getAllAsync(): Promise<TModel[]> {
        await this.reloadAsync();
        return this._data.slice(0);
    }

    protected abstract modelFromEntity(entity?: TEntity): TModel;
    protected abstract loadEntitiesAsync(): Promise<TEntity[]>;
}