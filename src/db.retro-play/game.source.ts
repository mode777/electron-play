import { GameEntity, GameModel } from "./game.model";
import { RetroPlayConnection } from "./retro-play.connection";
import { GenreModel } from "./genre.model";
import { TableSource } from "../db/common/table.source";

export class GameSource extends TableSource<GameModel, GameEntity> {

    constructor(connection: RetroPlayConnection){
        super(
            connection, 
            (entity) => new GameModel(connection, entity, !!entity), 
            "games");
    }

}