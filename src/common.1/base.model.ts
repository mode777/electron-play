import { Model, KeyObject } from "./model";

export abstract class BaseModel<TEntity extends {}> implements Model {
    
    private _entity: TEntity;
    private _exists: boolean = null;

    constructor(entity?: TEntity){
        if(entity){
            this.loadFromEntity(entity);
        }
        else {
            this.loadDefaults();
        }
        this._entity = this.createEntity();
    }

    async saveAsync(): Promise<void> {
        const newEntity = this.createEntity();
        await this.storeEntityAsync(newEntity);
        this._exists = true;
        this._entity = newEntity;
    }

    async reloadAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    cancel() {
        this.loadFromEntity(this._entity);
    }
    
    deleteAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    compare(other: Model): boolean {
        throw new Error("Method not implemented.");
    }

    protected abstract loadFromEntity(entity: TEntity);
    protected abstract loadDefaults();
    protected abstract createEntity(): TEntity;
    protected abstract getKeys(): KeyObject;
    protected abstract existsAsync(): Promise<boolean>;
    protected abstract storeEntityAsync(entity: TEntity): Promise<void>;
    protected abstract loadEntityAsync(): Promise<TEntity>;
}