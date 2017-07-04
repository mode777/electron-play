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

    private readonly _genreSource: ManyToManySource<GenreModel, GenreEntity>;

    constructor(connection: DbConnection, game?: GameEntity, exists = false){
        super(connection, "games", game, exists);

        this._genreSource = new ManyToManySource<GenreModel, GenreEntity>({
            connection: connection,
            factory: (entity) => new GenreModel(connection, entity, !!entity),
            manyTable: "genres",
            manyToManyJoin: { "genreId": "id" },
            manyToManyKeys: { "gameId": this.id },
            manyToManyTable: "gameGenres"
        });
    }    

    get genres() { return this._genreSource; }

}