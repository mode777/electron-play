import { Source, Model, KeyObject } from "../../common";
import { IdentityModel } from "./identity.model";
import { DbConnection } from "./db.connection";
import { DbSource, ModelFactory } from "./db.source";

export type JoinObject = {[key: string]: string};

export interface ManyToManyOptions<TModel extends Model, TEntity extends {}> {
    manyTable: string,
    manyToManyTable: string;
    manyToManyJoin: JoinObject;
    manyToManyKeys: KeyObject,
    factory: ModelFactory<TModel,TEntity>;
    connection: DbConnection;
    manyToManyColumns?: string[],
}

export class ManyToManySource<TModel extends Model, TEntity extends {}> extends DbSource<TModel, TEntity> {
    private readonly _manyToManyTable: string;
    private readonly _tableMany: string;
    private readonly _manyToManyJoin: JoinObject;
    private readonly _manyToManyKeys: KeyObject; 
    private readonly _manyToManyColumns: string[]; 
    
    constructor(options: ManyToManyOptions<TModel, TEntity>){
        super(options.connection, options.factory);
        this._manyToManyTable = options.manyToManyTable;
        this._manyToManyKeys = options.manyToManyKeys;
        this._manyToManyJoin = options.manyToManyJoin;
        this._tableMany = options.manyTable;
        this._manyToManyColumns = options.manyToManyColumns || [];
    }
    
    protected loadEntitiesAsync(): Promise<TEntity[]> {
        const selectClause = ["many.*"]
            .concat(this._manyToManyColumns.map(x => `md.${x} as ${x}`))
            .join(", ");

        const joinObject = this._manyToManyJoin;
        const joinColumns = Object.keys(joinObject);
        const joinClause = joinColumns.map(x => `mn.${x} = many.${joinObject[x]}`).join(" AND ");

        const whereObject = this._manyToManyKeys;
        const whereColumns = Object.keys(whereObject);
        const whereClause = whereColumns.map(x => `mn.${x} = ?`).join(" AND ");
        // where args
        const sqlArgs = whereColumns.map(x => joinObject[x]);

        return this.connection.queryAsync<any>(`
            select ${selectClause} from ${this._manyToManyTable} mn
            join ${this._tableMany} many on ${joinClause}
            where ${whereClause}
        `, ...sqlArgs);
    }

    public async addAsync(model?: TModel){
        model = model || this.modelFromEntity();
        await super.addAsync(model);
        // TODO...
    }
    
}