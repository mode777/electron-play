import { Injectable } from "@angular/core";
import { DbSource, DbConnection, DefaultSource } from "../db";
import { PlatformModel, PlatformEntity } from "./platform.model";
import { RetroPlayConnection } from "./retro-play.connection";

@Injectable()
export class PlatformSource extends DefaultSource<PlatformEntity, PlatformModel> {

    constructor(connection: RetroPlayConnection){
        super(connection, "platforms", (conn,ent) => new PlatformModel(conn,ent));
    }

}