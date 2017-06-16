import * as fs from "fs";
import {verbose, Database} from "sqlite3";

verbose();

export type DbValue = string | number | Uint8Array
//export type DbObject = {[key: string]: DbValue};

export class DbConnection {

    private readonly _db: Database;

    constructor(path){
        this._db = new Database(path);
    }

    public get database() { return this._db; }

    public async queryAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult[]> {
        return new Promise<TResult[]>((resolve, reject) => {
            this._db.all(query, params, (err, rows) => {
                err ? reject(err) : resolve(rows);
            });
        });
    }

    public async getAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult> {
        return new Promise<TResult>((resolve, reject) => {
            this._db.get(query, params, (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }

    public getByKeysAsync<TResult extends any>(table: string, keysObject: {[key:string]: any}){
        const whereColumns = Object.keys(keysObject);
        const whereValues = whereColumns.map(x => keysObject[x]);
        const whereClause = whereColumns.map(x => `${x} = ?`).join(", ");

        return this.getByWhereAsync<TResult>(table, whereClause, whereValues);
    }

    public getByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs = []){
        const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
        return this.getAsync<TResult>(query, ...whereClauseArgs);
    }

    public queryByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs = []){
        const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
        return this.queryAsync<TResult>(query, ...whereClauseArgs);
    }

    public async getScalarAsync(query: string, ...params: any[]): Promise<number> {
        const res = await this.getAsync(query, params);
        if(!res)
            return null;

        return <number>res[Object.keys(res)[0]];
    }

    public async executeAsync(query: string, ...params: any[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._db.run(query, params, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }

    public insertAsync(table: string, valuesObject: {[key:string]: any}){
        const columns = Object.keys(valuesObject);
        const values = columns.map(x => valuesObject[x]);
        const params = columns.map(x => "?");

        const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${params.join(",")})`;

        return this.executeAsync(query, ...values);
    }

    public updateByKeysAsync(table: string, valuesObject: {[key:string]: any}, keysObject: {[key:string]: any}){
        const whereColumns = Object.keys(keysObject);
        const whereValues = whereColumns.map(x => keysObject[x]);
        const whereClause = whereColumns.map(x => `${x} = ?`).join(", ");

        return this.updateByWhereAsync(table, valuesObject, whereClause, whereValues);
    }

    public updateByWhereAsync(table: string, valuesObject: {[key:string]: any}, whereClause: string, whereClauseArgs = []){
        const columns = Object.keys(valuesObject);
        const values = columns.map(x => valuesObject[x]);
        const setStatement = columns.map(x => `${x} = ?`).join(", ");
        const args = values.concat(whereClauseArgs);

        const query = `UPDATE ${table} SET ${setStatement} WHERE ${whereClause}`;

        return this.executeAsync(query, ...args);
    }

    public async runTransactionAsync(executor: () => Promise<void>){
        await this.executeAsync("BEGIN TRANSACTION");
        await executor();
        await this.executeAsync("END");
    }

    public getLastIdAsync() : Promise<number> {
        return this.getScalarAsync("SELECT last_insert_rowid() as id");
    } 
    
}