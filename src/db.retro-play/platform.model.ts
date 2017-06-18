
import { IdentityModel, DbConnection } from "../db";

export interface PlatformEntity {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel extends IdentityModel<PlatformEntity> {

    public name: string;
    public description: string;

    constructor(connection: DbConnection, platform?: PlatformEntity){
        super("platforms", connection, platform);
        if(!platform){
            this.name = "";
            this.description = null;
        }
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
        this.description = entity.description || null;
    }
    
}