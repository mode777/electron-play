import { Injectable } from "@angular/core";
import { DbSource, DbConnection, DefaultSource } from "../db";
import { GenreModel, GenreEntity } from "./genre.model";
import { RetroPlayConnection } from "./retro-play.connection";

@Injectable()
export class GenreSource extends DefaultSource<GenreEntity, GenreModel> {

    constructor(connection: RetroPlayConnection){
        super(connection, "genres", (conn, ent) => new GenreModel(conn, ent));
    }

}