import { DbBaseModel } from "./DbBaseModel";

export interface IdentityEntity {
    id: number;
}

export abstract class IdentityModel<TEntity extends IdentityEntity> extends DbBaseModel<TEntity> {

    private _id: number = 0;

    get id() { return this._id; }

    protected createAsync(){
        return this.connection.runTransactionAsync(async () => {
            await super.createAsync();
            this._id = await this.connection.getLastIdAsync();
        });
    }

    public getKeys() {
        return { id: this._id };
    }
    protected exists() {
        return this._id === 0;
    }

    protected loadFromEntity(entity: TEntity) {
        this._id = entity.id;
        this.loadAdditionalValues(entity);
    }

    protected abstract loadAdditionalValues(entity: TEntity);
    protected abstract getEntity(): TEntity;
} 