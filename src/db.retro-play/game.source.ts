import { DefaultSource } from "../db";
import { GameEntity, GameModel } from "./game.model";
import { RetroPlayConnection } from "./retro-play.connection";
import { GenreModel } from "./genre.model";

export class GameSource extends DefaultSource<GameEntity, GameModel> {
    
    

    constructor(connection: RetroPlayConnection){
        super(connection, "games", (conn, ent) => new GameModel(conn, ent));
    }





}