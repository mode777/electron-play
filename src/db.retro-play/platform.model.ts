import { IdentityModel, DbConnection, DefaultModel } from "../db";
import { LocationSource } from "./location.source";
import { RetroPlayConnection } from "./retro-play.db.module";

export interface PlatformEntity {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel extends DefaultModel<PlatformEntity> {

    private _locations: LocationSource = null;

    constructor(connection: DbConnection, platform?: PlatformEntity){
        super("platforms", connection, platform);
    }

    public get locations(){
        if(!this.exists())
            throw new Error("Cannot access locations for non-exisiting platform");
        
        if(!this._locations)
            this._locations = new LocationSource(<RetroPlayConnection>this.connection, this.id);

        return this._locations;
    }
    
}