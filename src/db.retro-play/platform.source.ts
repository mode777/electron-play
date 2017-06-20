import { Injectable } from "@angular/core";
import { DbSource, DbConnection } from "../db";
import { PlatformModel, PlatformEntity } from "./platform.model";
import { RetroPlayConnection } from "./retro-play.connection";

@Injectable()
export class PlatformSource extends DbSource<PlatformModel> {

    constructor(connection: RetroPlayConnection){
        super(connection, "platforms");
    }

    protected async loadDataAsync(): Promise<PlatformModel[]> {
         const entities = await this.connection.queryAsync<PlatformEntity>("select * from platforms");    
         return entities.map(x => new PlatformModel(this.connection, x));
    }

    protected async createModelAsync(): Promise<PlatformModel> {
        const model = new PlatformModel(this.connection);
        await model.saveAsync();
        return model;
    }

    public addByNameAsync(name: string, description?: string){
        const platform = new PlatformModel(this.connection, {
            id: 0,
            name: name,
            description: description
        });
        return this.addAsync(platform)
    }

}