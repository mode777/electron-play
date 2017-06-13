import * as fs from "fs";
import { Database, Statement } from "sql.js";

export type DbValue = string | number | Uint8Array
//export type DbObject = {[key: string]: DbValue};

export class DbConnection {

    private readonly _db: Database;

    constructor(path){
        const filebuffer = fs.readFileSync(path);
        this._db = new Database(filebuffer);
    }

    public get database() { return this._db; }

    public query<TResult>(query: string, ...param: DbValue[]): TResult[] {
        let stm: Statement;
        const results: TResult[] = [];

        try {
            stm = this._db.prepare(query);
            this._assertBind(stm.bind(param));
            while(stm.step()){
                results.push(<TResult><any>stm.getAsObject())
            }
        }
        finally {
            if(stm){
                stm.free();
            }
        }

        return results;
    }

    public queryStatement<TResult>(statement: Statement, ...param: DbValue[]){
        const results: TResult[] = [];

        this._assertBind(statement.bind(param));
        while(statement.step()){
            results.push(<TResult><any>statement.getAsObject())
        }  

        return results;
    }

    private _assertBind(res: boolean){
        if(!res)
            throw new Error("Parameters could not be bound. Invalid number of arguments?");
    }

    
}