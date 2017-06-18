
import { Model } from "../../common";

export interface DbModel extends Model {    
    getKeys(): any;
}