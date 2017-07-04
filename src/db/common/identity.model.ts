import { DbConnection } from "./db.connection";
import { KeyObject } from "../../common";
import { DbModel } from "./db.model";


export abstract class IdentityModel<TEntity extends {id: number}> extends DbModel<TEntity> {
    
    get id() {
        return this.entity.id;
    }

    public getKeys(): KeyObject {
        return { id: this.entity.id };
    }
    
    protected async storeEntity(entity: TEntity){
        await this.connection.runTransactionAsync(async () => {
            await super.storeEntityAsync(entity);
            this.entity.id = await this.connection.getLastIdAsync();
        });
    }

    protected abstract loadFromEntity(entity: TEntity); 
    protected abstract loadDefaults();
    protected abstract toEntity(): TEntity;   
} 