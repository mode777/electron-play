import { DbConnection } from "./DbConnection";

export class Repository {
    
    
    constructor(protected connection: DbConnection, private readonly _table: string){
        
    }

    public get table() { return this._table; }

    protected query(){

    }

}