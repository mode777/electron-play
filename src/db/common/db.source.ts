import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { BaseSource, Model } from "../../common";
import { DbConnection } from "./db.connection";

export type ModelFactory<TModel extends Model, TEntity extends {}> = (entity: TEntity) => TModel;

export abstract class DbSource<TModel extends Model, TEntity extends {}> extends BaseSource<TModel, TEntity> {

    constructor(
        protected readonly connection: DbConnection, 
        protected readonly factory: ModelFactory<TModel,TEntity>){
            super();
    }

    protected modelFromEntity(entity?: TEntity): TModel {
        return this.factory(entity);
    }
    protected abstract loadEntitiesAsync(): Promise<TEntity[]>;
}