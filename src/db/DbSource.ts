import { BaseSource, Model } from "../data";
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { DbModel } from "./DbModel";
import { DbConnection } from "./DbConnection";
import { DbBaseModel } from "./DbBaseModel";



export abstract class DbSource<T extends DbModel> extends BaseSource<T> {

    constructor(protected connection: DbConnection, protected readonly table: string){
        super();
    }

    protected deleteItemAsync(item: T): Promise<void> {
        return this.connection.deleteByKeysAsync(this.table, item.getKeys());
    }

    protected abstract loadDataAsync(): Promise<T[]>;
    protected abstract createModelAsync(): Promise<T>;
}