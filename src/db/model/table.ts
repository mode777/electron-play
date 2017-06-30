import { Field } from "./field";
import { UpdateType } from "./constants";
import { Relation } from "./relation";

export class Table {
    
    private readonly _fields: Field[] = [];
    private readonly _relations: Relation[] = [];
    private _keys: string[] = [];

    constructor(public readonly name: String) { }   
    
    field(name: string, type: string, ...constraints: string[]){
        this._fields.push(new Field(name, type, ...constraints));
        return this;
    }

    primaryKeys(...keys: string[]){
        this._keys = keys;
        return this;
    }

    foreignKey(foreignKey: string, foreignTable: string, primaryKey: string, onDelete?: UpdateType, onUpdate?: UpdateType){
        this._relations.push(new Relation(foreignKey, foreignTable, primaryKey, onDelete, onUpdate));
        return this;
    }

    toSql(){
        const content = [this._fields.map(x => x.toSql()).join(",\n")];
        if(this._keys.length > 0)
            content.push(`PRIMARY KEY (${this._keys.join(", ")})`);
        if(this._relations.length > 0)
            content.push(this._relations.map(x => x.toSql()).join(",\n"));

        return `
CREATE TABLE ${this.name}(
${content.join(",\n")}
)
        `
    }
}