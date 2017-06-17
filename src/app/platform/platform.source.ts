import { DbSource } from "../../db/DbSource";
import { PlatformModel, PlatformEntity } from "./platform.model";
import { DbConnection } from "../../db/DbConnection";

export class PlatformSource extends DbSource<PlatformModel> {

    constructor(connection: DbConnection){
        super(connection, "platforms");
    }

    protected async loadDataAsync(): Promise<PlatformModel[]> {
         const entities = await this.connection.queryAsync<PlatformEntity>("select * from platforms");    
         return entities.map(x => new PlatformModel(this.connection, x));
    }

    protected async createModelAsync(): Promise<PlatformModel> {
        const model = new PlatformModel(this.connection);
        await model.saveAsync();
        return model;
    }

}