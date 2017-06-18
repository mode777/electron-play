import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { BaseSource } from "../../common";
import { DbModel } from "./db.model";
import { DbConnection } from "./db.connection";

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