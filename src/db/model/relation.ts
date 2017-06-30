import { UpdateType } from "./constants";

export class Relation {
    constructor(
        public readonly foreignKey: string, 
        public readonly foreignTable: string, 
        public readonly primaryKey: string, 
        public readonly onDelete: UpdateType = null, 
        public readonly onUpdate: UpdateType = null){

    }

    toSql(){
        const _delete = this.onDelete ? `ON DELETE ${this.onDelete}` : "";
        const update = this.onUpdate ? `ON UPDATE ${this.onUpdate}` : "";

        return `FOREIGN KEY (${this.foreignKey}) REFERENCES ${this.foreignTable}(${this.primaryKey}) ${update} ${_delete}`
    }
}