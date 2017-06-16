// import { DbConnection } from "./DbConnection";

// export interface ModelOptions {
//     keys: string[];
//     aiKeys: string[];
//     table: string;
// }

// export abstract class DbModel<TRow extends {}> {
//     protected _row: TRow;
//     protected _lastLoad: Date;
//     protected _keys: any[];

//     constructor(protected _connection: DbConnection, protected _options){
//         this._keys = keys;
//     }

//     get isLoaded() { return this._lastLoad !== null; }
//     get lastLoad() { return this._lastLoad; }

//     loadFromObject(row: any){

//         this._loaded();
//     }

//     loadFromDb(){
//         this._loaded();
//     }

//     private _loaded(){
//         this._lastLoad = new Date();
//     }



// }