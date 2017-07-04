import { Model, BaseModel, KeyObject } from "../../common";
import { DbConnection } from "./db.connection";


export abstract class DbModel<TEntity extends {}> extends BaseModel<TEntity> {

    constructor(
        protected readonly connection: DbConnection, 
        public readonly table: string, 
        entity?: TEntity, 
        exists = false){
            super(entity, exists);
    }
    
    public abstract getKeys(): KeyObject;
    protected abstract loadFromEntity(entity: TEntity);
    protected abstract loadDefaults();
    protected abstract toEntity(): TEntity;

    protected async storeEntityAsync(entity: TEntity): Promise<void> {
        if(this.exists()){
            await this.connection.updateByKeysAsync(this.table, this.toEntity(), this.getKeys());
        }
        else {
            await this.connection.insertAsync(this.table, this.toEntity());
        }
    }

    protected loadEntityAsync(): Promise<TEntity> {
        return this.connection.getByKeysAsync(this.table, this.getKeys());
    }    

}

