import { ReplaySubject, Observable } from "rxjs/Rx";

import { Source, Model, KeyObject } from "../../common";
import { IdentityModel } from "./identity.model";
import { DbConnection } from "./db.connection";
import { DbSource, ModelFactory } from "./db.source";

export interface OneToManyOptions<TModel extends Model, TEntity extends {}> {
    manyTable: string,
    manyKeys: KeyObject,
    factory: ModelFactory<TModel,TEntity>;
    connection: DbConnection;
}

export class OneToManySource<TModel extends Model, TEntity extends {}> extends DbSource<TModel, TEntity> {

    private readonly _manyTable: string;
    private readonly _manyKeys: KeyObject;
    
    constructor(options: OneToManyOptions<TModel,TEntity>){
        super(options.connection, options.factory);
        this._manyKeys = options.manyKeys;
        this._manyTable = options.manyTable;        
    }
    
    protected loadEntitiesAsync(): Promise<TEntity[]> {
        return this.connection.queryByKeysAsync(this._manyTable, this._manyKeys);
    }
    
}