import { Model, KeyObject } from "./model";

export abstract class BaseModel<TEntity extends {}> implements Model {
    
    protected entity: TEntity;

    constructor(entity?: TEntity, private _exists = false){
        if(entity){
            this.loadFromEntity(entity);
            this.entity = entity;
        }
        else {
            this.loadDefaults();
            this.entity = this.toEntity();
        }
    }

    async saveAsync(): Promise<void> {
        const newEntity = this.toEntity();
        await this.storeEntityAsync(newEntity);
        this._exists = true;
        this.entity = newEntity;
    }

    async reloadAsync(): Promise<void> {
        if(!this._exists)
            return;
        
        this.entity = await this.loadEntityAsync();
        this.loadFromEntity(this.entity);
    }
    
    cancel() {
        this.loadFromEntity(this.entity);
    }
    
    async deleteAsync(): Promise<void> {
        if(this._exists){
            await this.deletEntityAsync(this.entity);
            this.loadDefaults();
            this.entity = this.toEntity();
        }
        this._exists = false;
    }
    
    compare(other: Model): boolean {
        return this.compareKeys(this.getKeys(), other.getKeys());
    }

    protected compareKeys(keyA: KeyObject, keyB: KeyObject){
        const keysA = Object.keys(keyA);
        const keysB = Object.keys(keyB);

        if(keysA.length !== keysB.length)
            return false;

        for (let i = 0; i < keysA.length; i++) {
            const key = keysA[i];
            if(keysB[i] !== key || keyA[key] !== keyB[key])
                return false;
        }

        return false;
    }

    public exists(): boolean{
        return this._exists;
    }

    public abstract getKeys(): KeyObject;
    protected abstract loadFromEntity(entity: TEntity);
    protected abstract loadDefaults();
    protected abstract toEntity(): TEntity;
    protected abstract storeEntityAsync(entity: TEntity): Promise<void>;
    protected abstract loadEntityAsync(): Promise<TEntity>;
    protected abstract deletEntityAsync(entity: TEntity): Promise<void>;
}