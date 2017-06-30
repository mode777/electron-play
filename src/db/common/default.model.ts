import { DbConnection } from "./db.connection";
import { IdentityModel, IdentityEntity } from "./identity.model";

export interface DefaultEntity extends IdentityEntity {
    name: string;
    description?: string
}

export class DefaultModel<T extends DefaultEntity> extends IdentityModel<T> {

    public name: string;
    public description: string;

    constructor(table: string, connection: DbConnection, entity?: T){
        super(table, connection, entity);
        if(!entity){
            this.name = "";
            this.description = null;
        }
    }

    protected getEntity(): T {
        return <T>{
            id: this.id,
            name: this.name,
            description: this.description
        }
    }   

    protected loadAdditionalValues(entity: T) {
        this.name = entity.name;
        this.description = entity.description || null;
    }
    
}