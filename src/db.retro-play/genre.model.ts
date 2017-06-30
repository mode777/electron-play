import { IdentityModel, DbConnection, DefaultModel, ManyToManySource } from "../db";
import { RetroPlayConnection } from "./retro-play.db.module";
import { GameEntity, GameModel } from "./game.model";
import { Observable } from "rxjs/Rx";

export interface GenreEntity {
    id: number;
    name: string;
    description?: string
}

export class GenreModel extends DefaultModel<GenreEntity> {

    private readonly _gameSource: ManyToManySource<GameEntity, GameModel, GenreModel>;
    
    constructor(connection: DbConnection, genre?: GenreEntity){
        super("genres", connection, genre);

        this._gameSource = new ManyToManySource<GameEntity, GameModel, GenreModel>({
            connection: this.connection,
            manyFactory: (conn, ent) => new GameModel(conn, ent),
            manyKey: "gameId",
            oneKey: "genreId",
            manyTable: "games",
            manyToManyTable: "gameGenres",
            one: this 
        });
    }    

    observeGames() {
        return this._gameSource.observe();    
    }

    addGenreAsync(game: GameModel) {
        return this._gameSource.addAsync(game);    
    }

    removeGenreAsync(game: GameModel) {
        return this._gameSource.removeAsync(game);
    }
}