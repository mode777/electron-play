import { IdentityModel, DbConnection, DefaultModel, DbSource, ManyToManySource } from "../db";
import { RetroPlayConnection } from "./retro-play.db.module";
import { GenreModel, GenreEntity } from "./genre.model";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { BaseSource, Source } from "../common/index";
import { Observable } from "rxjs/Rx";

export interface GameEntity {
    id: number;
    name: string;
    description?: string
}

export class GameModel extends DefaultModel<GameEntity> {

    private readonly _genreSource: ManyToManySource<GenreEntity, GenreModel, GameModel>;

    constructor(connection: DbConnection, game?: GameEntity){
        super("games", connection, game);

        this._genreSource = new ManyToManySource<GenreEntity, GenreModel, GameModel>({
            connection: this.connection,
            manyFactory: (conn, ent) => new GenreModel(conn, ent),
            manyKey: "genreId",
            oneKey: "gameId",
            manyTable: "genres",
            manyToManyTable: "gameGenres",
            one: this 
        });
    }    

    observeGenres() {
        return this._genreSource.observe();    
    }

    addGenreAsync(genre: GenreModel) {
        return this._genreSource.addAsync(genre);    
    }

    removeGenreAsync(genre: GenreModel) {
        return this._genreSource.removeAsync(genre);
    }
}