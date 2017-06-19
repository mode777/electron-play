
import { IdentityModel, DbConnection } from "../db";

export interface LocationEntity {
    id: number;
    isFolder?: number;
    extensions?: string;
    path?: string;
    platformId: number;
}

export class LocationModel extends IdentityModel<LocationEntity> {

    public isFolder: boolean;
    public extensions: string[];
    public path: string;
    
    private _platformId: number;

    constructor(connection: DbConnection, platformId: number, location?: LocationEntity){
        super("locations", connection, location);
        if(!location){
            this.isFolder = null;
            this.extensions = [];
            this.path = null;
            this._platformId = platformId;
        }
    }

    protected getEntity(): LocationEntity {
        return {
            id: this.id,
            extensions: JSON.stringify(this.extensions),
            isFolder: this.isFolder ? 1 : 0,
            path: this.path,
            platformId: this._platformId
        }
    }   

    protected loadAdditionalValues(entity: LocationEntity) {
        this.isFolder = entity.isFolder !== null ? entity.isFolder !== 0 : false;
        this.extensions = JSON.parse(entity.extensions || "[]");
        this.path = entity.path;
        this._platformId = entity.platformId;
    }
    
}