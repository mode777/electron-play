import * as fs from "fs";

import {verbose, Database, OPEN_CREATE} from "sqlite3";
import { DbConnection } from "../common";
import { DbInitializer } from "../db.initializer";

verbose();

export class Sqlite3Connection implements DbConnection {

    private readonly _db: Database;
    private readonly _initialized: Promise<void>;

    constructor(private _initializer: DbInitializer, path: string){
        if(fs.existsSync(path)){
            this._db = new Database(path);
            this._initialized = new Promise<void>((res, rej) => res());
        }
        else {
            this._db = new Database(path);
            this._initialized = this._initializeAsync();   
        }
    }

    public async queryAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult[]> {
        await this._initialized;
        return new Promise<TResult[]>((resolve, reject) => {
            this._db.all(query, params, (err, rows) => {
                err ? reject(err) : resolve(rows);
            });
        });
    }

    public async getAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult> {
        await this._initialized;
        return new Promise<TResult>((resolve, reject) => {
            this._db.get(query, params, (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }

    public async getByKeysAsync<TResult extends any>(table: string, keysObject: any){
        await this._initialized;
        
        const whereColumns = Object.keys(keysObject);
        const whereValues = whereColumns.map(x => keysObject[x]);
        const whereClause = whereColumns.map(x => `${x} = ?`).join(" AND ");

        return this.getByWhereAsync<TResult>(table, whereClause, whereValues);
    }

    public async getByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs = []){
        await this._initialized;

        const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
        return this.getAsync<TResult>(query, ...whereClauseArgs);
    }

    public async queryByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs = []){
        await this._initialized;
        
        const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
        return this.queryAsync<TResult>(query, ...whereClauseArgs);
    }

    public async getScalarAsync(query: string, ...params: any[]): Promise<number> {
        await this._initialized;

        const res = await this.getAsync(query, params);
        if(!res)
            return null;

        return <number>res[Object.keys(res)[0]];
    }

    public async executeAsync(query: string, ...params: any[]): Promise<void> {
        await this._initialized;
        
        return new Promise<void>((resolve, reject) => {
            this._db.run(query, params, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }

    public async insertAsync(table: string, valuesObject: any){
        await this._initialized;

        const columns = Object.keys(valuesObject);
        const values = columns.map(x => valuesObject[x]);
        const params = columns.map(x => "?");

        const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${params.join(",")})`;

        return this.executeAsync(query, ...values);
    }

    public async updateByKeysAsync(table: string, valuesObject: any, keysObject: any){
        await this._initialized;
        
        const whereColumns = Object.keys(keysObject);
        const whereValues = whereColumns.map(x => keysObject[x]);
        const whereClause = whereColumns.map(x => `${x} = ?`).join(" AND ");

        return this.updateByWhereAsync(table, valuesObject, whereClause, whereValues);
    }

    public async updateByWhereAsync(table: string, valuesObject: any, whereClause: string, whereClauseArgs = []){
        await this._initialized;
        
        const columns = Object.keys(valuesObject);
        const values = columns.map(x => valuesObject[x]);
        const setStatement = columns.map(x => `${x} = ?`).join(", ");
        const args = values.concat(whereClauseArgs);

        const query = `UPDATE ${table} SET ${setStatement} WHERE ${whereClause}`;

        return this.executeAsync(query, ...args);
    }

    public async runTransactionAsync(executor: () => Promise<void>){
        await this._initialized;
        await this.executeAsync("BEGIN TRANSACTION");
        await executor();
        await this.executeAsync("END");
    }

    public async getLastIdAsync() : Promise<number> {
        await this._initialized;
        return this.getScalarAsync("SELECT last_insert_rowid() as id");
    } 
    
    public async deleteByKeysAsync(table: string, keysObject: any): Promise<void> {
        await this._initialized;
        
        const whereColumns = Object.keys(keysObject);
        const whereValues = whereColumns.map(x => keysObject[x]);
        const whereClause = whereColumns.map(x => `${x} = ?`).join(" AND ");

        return this.deleteByWhereAsync(table, whereClause, whereValues);
    }
    
    public async deleteByWhereAsync(table: string, whereClause: string, whereClauseArgs: any[]): Promise<void> {
        await this._initialized;
        
        const query = `DELETE FROM ${table} WHERE ${whereClause}`;
        return this.executeAsync(query, ...whereClauseArgs);
    }

    public async closeAsync() {
        await this._initialized;
        
        return new Promise<void>((resolve, reject)=> {
            this._db.close((err)=> {
                err ? reject(err) : resolve();
            });
        });
    }

    private async _initializeAsync(){
        const sql = this._initializer.getScripts();
        
        const exec = (sql: string) => new Promise<void>((resolve, reject) => {
            this._db.run(sql, (err) => {
                err ? reject(err) : resolve();
            });
        });

        await exec("BEGIN TRANSACTION");
        for(let statement of sql){
            await exec(statement);
        }
        await exec("END");
        console.log("New database created")
    }
    
}