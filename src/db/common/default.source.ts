import { Injectable } from "@angular/core";
import { DefaultModel, DefaultEntity } from "./default.model";
import { DbSource } from "./db.source";
import { DbConnection } from "./db.connection";

@Injectable()
export class DefaultSource<TEntity extends DefaultEntity, TModel extends DefaultModel<TEntity>> extends DbSource<TModel> {

    constructor(connection: DbConnection, table: string, protected readonly factory: (conn: DbConnection, entity?: TEntity) => TModel){
        super(connection, table);
    }

    protected async loadDataAsync(): Promise<TModel[]> {
         const entities = await this.connection.queryAsync<TEntity>(`select * from ${this.table}`);    
         return entities.map(x => this.factory(this.connection, x));
    }

    protected async createModelAsync(): Promise<TModel> {
        const model = this.factory(this.connection);
        await model.saveAsync();
        return model;
    }

    public addByNameAsync(name: string, description?: string){
        const model = this.factory(this.connection, <TEntity>{
            id: 0,
            name: name,
            description: description
        });
        return this.addAsync(model)
    }
}