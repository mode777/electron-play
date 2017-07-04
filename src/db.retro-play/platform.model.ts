import { IdentityModel, DbConnection, DefaultModel } from "../db";
import { RetroPlayConnection } from "./retro-play.db.module";
import { Source } from "../common/source";
import { LocationModel, LocationEntity } from "./location.model";
import { OneToManySource } from "../db/common/one-to-many.source";

export interface PlatformEntity {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel extends DefaultModel<PlatformEntity> {

    private _locations: Source<LocationModel>;

    constructor(connection: DbConnection, platform?: PlatformEntity, exists = false){
        super(connection, "platforms", platform, exists);

        this._locations = new OneToManySource<LocationModel, LocationEntity>({
            connection: connection,
            factory: (entity) => new LocationModel(connection, this, entity, !!entity),
            manyTable: "locations",
            manyKeys: { "platformId": this.id },
        });
    }

    get locations() { return this._locations; }   
}