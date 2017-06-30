import { DbInitializer, Table, FieldTypes, Constraints, Behaviour } from "../db";
import { Injectable } from "@angular/core";

@Injectable()
export class RetroPlayInitializer extends DbInitializer {

    public getScripts(): string[] {
        const platforms = new Table("platforms")
            .field("id", FieldTypes.INTEGER, Constraints.PRIMARY_KEY)
            .field("name", FieldTypes.TEXT, Constraints.NULL)
            .field("description", FieldTypes.TEXT, Constraints.NULL)

        const locations = new Table("locations")
            .field("id", FieldTypes.INTEGER, Constraints.PRIMARY_KEY)
            .field("isFolder", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("extensions", FieldTypes.TEXT, Constraints.NULL)
            .field("path", FieldTypes.TEXT, Constraints.NULL)
            .field("platformId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .foreignKey("platformId", "platforms", "id", Behaviour.CASCADE);

        const games = new Table("games")
            .field("id", FieldTypes.INTEGER, Constraints.PRIMARY_KEY)
            .field("name", FieldTypes.TEXT, Constraints.NULL)
            .field("description", FieldTypes.TEXT, Constraints.NULL)

        const releases = new Table("releases")
            .field("gameId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("platformId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("date", FieldTypes.DATE, Constraints.NULL)
            .primaryKeys("gameId, platformId")
            .foreignKey("gameId", "games", "id")
            .foreignKey("platformId", "platforms", "id");

        const volumes = new Table("volumes")
            .field("number", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("gameId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("platformId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("path", FieldTypes.TEXT, Constraints.NULL)
            .primaryKeys("number, gameId, platformId")
            .foreignKey("gameId", "games", "id")
            .foreignKey("platformId", "platforms", "id");

        const genres = new Table("genres")
            .field("id", FieldTypes.INTEGER, Constraints.PRIMARY_KEY)
            .field("name", FieldTypes.TEXT, Constraints.NULL)
            .field("description", FieldTypes.TEXT, Constraints.NULL)

        const gameGenres = new Table("gameGenres")
            .field("gameId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .field("genreId", FieldTypes.INTEGER, Constraints.NOT_NULL)
            .primaryKeys("gameId, genreId")
            .foreignKey("gameId", "games", "id")
            .foreignKey("genreId", "genres", "id");
        
        return [
            platforms, 
            locations,
            games, 
            releases, 
            volumes, 
            genres, 
            gameGenres
        ].map(x => x.toSql());
    }

}