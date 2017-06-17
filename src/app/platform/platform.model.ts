import { IdentityModel } from "../../db/IdentityModel";
import { DbConnection } from "../../db/DbConnection";

export interface PlatformEntity {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel extends IdentityModel<PlatformEntity> {

    public name = "";
    public description = null;

    constructor(connection: DbConnection, platform?: PlatformEntity){
        super("platforms", connection, platform)
    }

    protected getEntity(): PlatformEntity {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        }
    }   

    protected loadAdditionalValues(entity: PlatformEntity) {
        this.name = entity.name;
        this.description = entity.description;
    }
    
}