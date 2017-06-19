
import { IdentityModel, DbConnection } from "../db";
import { LocationSource } from "./location.source";
import { RetroPlayConnection } from "./retro-play.db.module";

export interface PlatformEntity {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel extends IdentityModel<PlatformEntity> {

    public name: string;
    public description: string;

    private _locations: LocationSource = null;

    constructor(connection: DbConnection, platform?: PlatformEntity){
        super("platforms", connection, platform);
        if(!platform){
            this.name = "";
            this.description = null;
        }
    }

    protected getEntity(): PlatformEntity {
        console.log(this);
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

    public get locations(){
        if(!this.exists())
            throw new Error("Cannot access locations for non-exisiting platform");
        
        if(!this._locations)
            this._locations = new LocationSource(<RetroPlayConnection>this.connection, this.id);

        return this._locations;
    }
    
}