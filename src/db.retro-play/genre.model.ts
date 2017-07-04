import { IdentityModel, DbConnection, DefaultModel, ManyToManySource } from "../db";
import { RetroPlayConnection } from "./retro-play.db.module";
import { GameEntity, GameModel } from "./game.model";
import { Observable } from "rxjs/Rx";
import { Source } from "../common/source";

export interface GenreEntity {
    id: number;
    name: string;
    description?: string
}

export class GenreModel extends DefaultModel<GenreEntity> {

    private readonly _gameSource: Source<GameModel>;
    
    constructor(connection: DbConnection, genre?: GenreEntity, exisits = false){
        super(connection, "genres", genre, exisits);

        this._gameSource = new ManyToManySource<GameModel, GameEntity>({
            connection: connection,
            factory: (entity) => new GameModel(connection, entity, !!entity),
            manyTable: "games",
            manyToManyJoin: { "gameId": "id" },
            manyToManyKeys: { "genreId": this.id },
            manyToManyTable: "gameGenres"
        });
    }    

    get games() { return this._gameSource; }
}