import { DbModel } from "./db-base.model";
import { DbConnection } from "./db.connection";
import { KeyObject } from "../../common";


export abstract class IdentityModel<TEntity extends {id: number}> extends DbModel<TEntity> {
    
    get id() {
        return this.entity.id;
    }

    public getKeys(): KeyObject {
        return { id: this.entity.id };
    }
    
    protected abstract loadFromEntity(entity: TEntity); 
    protected abstract loadDefaults();
    protected abstract toEntity(): TEntity;   
} 