import { Model } from "../../common";
import { DbModel } from "./db.model";
import { DbConnection } from "./db.connection";


export abstract class DbBaseModel<TEntity extends {}> implements DbModel {

    private entity: TEntity = null;

    constructor(protected readonly table: string, protected readonly connection: DbConnection, entity?: TEntity){
        if(entity){
            this.entity = entity;
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
        this.entity = row;
        this.loadFromEntity(row);
    }

    protected async createAsync(){
        const entity = this.getEntity()
        await this.connection.insertAsync(this.table, entity);
        this.entity = entity;
    }

    protected async updateAsync(){
        const entity = this.getEntity();
        await this.connection.updateByKeysAsync(this.table, entity, this.getKeys());
        this.entity = entity;
    }

    cancelAsync(): Promise<void> {
        if(this.entity){
            this.loadFromEntity(this.entity);
        }
        return Promise.resolve()
    }

    public abstract getKeys(): any;
    public abstract exists(): boolean;
    protected abstract loadFromEntity(entity: TEntity);
    protected abstract getEntity(): TEntity;
}

