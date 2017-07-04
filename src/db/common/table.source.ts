import { Injectable } from "@angular/core";
import { DbSource, ModelFactory } from "./db.source";
import { DbConnection } from "./db.connection";
import { Model } from "../../common/model";

@Injectable()
export class TableSource<TModel extends Model, TEntity extends {}> extends DbSource<TModel, TEntity> {

    constructor(connection: DbConnection, factory: ModelFactory<TModel, TEntity>, public readonly table: string){
        super(connection, factory);
    }

    protected loadEntitiesAsync(): Promise<TEntity[]> {
        return this.connection.queryAsync(`select * from ${this.table}`);
    }
    
}