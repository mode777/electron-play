import { Model } from "../../common";
import { DbModel } from "./db.model";
import { DbConnection } from "./db.connection";


export abstract class DbBaseModel<TEntity extends {}> implements DbModel {

    constructor(protected readonly table: string, protected readonly connection: DbConnection, entity?: TEntity){
        if(entity){
            this.loadFromEntity(entity);
        }
    }
    
    async saveAsync(){
        if(!this.exists()){
            return this.createAsync();
        }
        else {
            return this.updateAsync();
        }
    }

    async reloadAsync(){
        const row = await this.connection.getByKeysAsync<TEntity>(this.table, this.getKeys());
        this.loadFromEntity(row);
    }

    protected createAsync(){
        return this.connection.insertAsync(this.table, this.getEntity());
    }

    protected updateAsync(){
        return this.connection.updateByKeysAsync(this.table, this.getEntity(), this.getKeys());
    }

    public abstract getKeys(): any;
    protected abstract loadFromEntity(entity: TEntity);
    protected abstract getEntity(): TEntity;
    protected abstract exists(): boolean;
}

