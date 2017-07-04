import { Injectable } from "@angular/core";
import { DbSource, DbConnection } from "../db";
import { PlatformModel, PlatformEntity } from "./platform.model";
import { RetroPlayConnection } from "./retro-play.connection";

@Injectable()
export class PlatformSource extends DefaultSource<PlatformModel, PlatformEntity> {

    constructor(connection: RetroPlayConnection){
        super(connection, "platforms", (conn,ent) => new PlatformModel(conn,ent));
    }

}