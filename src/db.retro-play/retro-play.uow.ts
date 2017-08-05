import { RetroPlayConnection } from "./retro-play.connection";
import { GameSource } from "./game.source";
import { GenreSource } from "./genre.source";
import { PlatformSource } from "./platform.source";

export class RetroPlayUow {

    readonly games: GameSource;
    readonly genres: GenreSource;
    readonly platforms: PlatformSource;
    
    constructor(public readonly connection: RetroPlayConnection){
        this.games = new GameSource(connection);
        this.genres = new GenreSource(connection);
        this.platforms = new PlatformSource(connection);
    }
}