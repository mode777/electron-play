import { ReplaySubject, Observable } from "rxjs/Rx";

import { Source, Model } from "../../common";
import { IdentityModel } from "./identity.model";
import { DbConnection } from "./db.connection";

export interface OneToManyOptions<TManyEntity, TMany extends IdentityModel<{id: number}>, TOne extends IdentityModel<{id: number}>> {
    connection: DbConnection,
    one: TOne,
    manyTable: string,
    manyKey: string,
    manyFactory: (conn: DbConnection, ent: TManyEntity) => TMany;
}

export class OneToManySource<TManyEntity, TMany extends IdentityModel<{id: number}>, TOne extends IdentityModel<{id: number}>> implements Source<TMany> {
    private readonly _subject = new ReplaySubject<TMany[]>(1);
    private readonly _connection: DbConnection
    private readonly _one: TOne;
    private readonly _tableMany: string;
    private readonly _keyMany: string;
    private readonly _factory: (conn: DbConnection, entity?: TManyEntity) => TMany;

    private _data: TMany[] = [];    
    private _initialized = false;    
    
    constructor(options: OneToManyOptions<TManyEntity, TMany, TOne>){
        this._connection = options.connection;
        this._one = options.one;
        this._tableMany = options.manyTable;
        this._keyMany = options.manyKey;
        this._factory = options.manyFactory;
    }
    
    async addAsync(model?: TMany): Promise<void> {
        model = model || this._factory(this._connection);
        model[this._keyMany] = this._one.id;

        if(await this.containsAsync(model))
            return;
        
        this._connection.runTransactionAsync(async () => {
            if(!model.exists){
                await model.saveAsync();
            }
        });

        this._data.push(model);
        this._subject.next(this._data);
    }

    async removeAsync(model: TMany): Promise<void> {
        if(!await this.containsAsync(model))
            return;

        await this._connection.deleteByKeysAsync(this._tableMany, { id: model.id });

        const idx = this._data.indexOf(model);
        this._data.splice(idx, 1);
        this._subject.next(this._data);
    }
    
    async syncAsync(): Promise<void> {
        const entities = await this._connection.queryByWhereAsync<TManyEntity>(
            this._tableMany, 
            `${this._keyMany} = ?`, 
            [this._one.id]);
        
        this._data = entities.map(x => this._factory(this._connection, x));      
        this._subject.next(this._data);
    }

    observe(): Observable<TMany[]> {
        if(!this._initialized){
            this.syncAsync();
            this._initialized = true;
        }
        return this._subject;
    }

    async containsAsync(item: TMany){
        const many = await this._subject.toPromise();
        
        if(many.findIndex(x => x.id === item.id) !== -1)
            return true;

        return false;
    }
}