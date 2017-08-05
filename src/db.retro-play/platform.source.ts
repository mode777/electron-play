import { Injectable } from "@angular/core";
import { DbSource, DbConnection } from "../db";
import { PlatformModel, PlatformEntity } from "./platform.model";
import { RetroPlayConnection } from "./retro-play.connection";
import { TableSource } from "../db/common/table.source";

@Injectable()
export class PlatformSource extends TableSource<PlatformModel, PlatformEntity> {

    constructor(connection: RetroPlayConnection){
        super(connection, (ent) => new PlatformModel(connection,ent, true), "platforms");
    }

}