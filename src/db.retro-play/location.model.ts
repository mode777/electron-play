import { IdentityModel, DbConnection } from "../db";
import { PlatformModel } from "./platform.model";

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

    constructor(connection: DbConnection, platform: PlatformModel, location?: LocationEntity, exists = false){
        super(connection, "locations", location, exists);
        this.entity.platformId = platform.id;
    }

    protected loadFromEntity(entity: LocationEntity) {
        this.isFolder = entity.isFolder > 0 ? true : false;
        this.extensions = JSON.parse(entity.extensions || "[]");
        this.path = entity.path;
        this._platformId = entity.platformId;
    }
    
    protected loadDefaults() {
        this.isFolder = null;
        this.extensions = [];
        this.path = null;
        this._platformId = 0;
    }
    
    protected toEntity(): LocationEntity {
        return {
            id: this.id,
            extensions: JSON.stringify(this.extensions),
            isFolder: this.isFolder ? 1 : 0,
            path: this.path,
            platformId: this._platformId
        }
    }
}