import { Injectable } from "@angular/core";
import { DbSource, DbConnection } from "../db";
import { LocationModel, LocationEntity } from "./location.model";
import { RetroPlayConnection } from "./retro-play.connection";

@Injectable()
export class LocationSource extends DbSource<LocationModel> {

    constructor(connection: RetroPlayConnection, private _platformId: number){
        super(connection, "locations");
    }

    protected async loadDataAsync(): Promise<LocationModel[]> {
         const entities = await this.connection.queryByWhereAsync<LocationEntity>(this.table, "platformId = ?", [this._platformId]);    
         return entities.map(x => new LocationModel(this.connection, this._platformId, x));
    }

    protected async createModelAsync(): Promise<LocationModel> {
        const model = new LocationModel(this.connection, this._platformId);
        await model.saveAsync();
        return model;
    }
}