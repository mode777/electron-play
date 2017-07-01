import { DbBaseModel } from "./db-base.model";
import { DbConnection } from "./db.connection";

export interface IdentityEntity {
    id: number;
}

export abstract class IdentityModel<TEntity extends IdentityEntity> extends DbBaseModel<TEntity> {

    private _id: number;

    get id() { return this._id; }

    constructor(table: string, connection: DbConnection, entity: TEntity){
        super(table, connection, entity);
        if(!entity)
            this._id = 0;
    }

    protected createAsync(){
        const createAsync = super.createAsync;
        return this.connection.runTransactionAsync(async () => {
            await createAsync.call(this);
            this._id = await this.connection.getLastIdAsync();
        });
    }

    public getKeys() {
        return { id: this._id };
    }
    
    public exists() {
        return this._id !== 0;
    }

    protected loadFromEntity(entity: TEntity) {
        this._id = entity.id;
        this.loadAdditionalValues(entity);
    }

    protected abstract loadAdditionalValues(entity: TEntity);
    protected abstract getEntity(): TEntity;
} 