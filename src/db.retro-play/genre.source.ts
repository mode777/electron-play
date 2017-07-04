import { Injectable } from "@angular/core";
import { DbSource, DbConnection } from "../db";
import { GenreModel, GenreEntity } from "./genre.model";
import { RetroPlayConnection } from "./retro-play.connection";
import { TableSource } from "../db/common/table.source";

@Injectable()
export class GenreSource extends TableSource<GenreModel, GenreEntity> {

    constructor(connection: RetroPlayConnection){
        super(
            connection, 
            (entity) => new GenreModel(connection, entity, !!entity),
            "genres");
    }

}