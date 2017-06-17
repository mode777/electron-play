import { Model } from "../data";
import { DbConnection } from "./DbConnection";

export interface DbModel extends Model {    
    getKeys(): any;
}