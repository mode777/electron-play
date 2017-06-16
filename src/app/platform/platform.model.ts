import { DbConnection } from "../../db";

const TABLE = "platforms";

export interface Platform {
    id: number;
    name: string;
    description?: string
}

export class PlatformModel implements Platform {

    private _id = 0;
    public name = "";
    public description = null;

    constructor(private _connection: DbConnection, platform?: Platform){
        if(platform)
            this._loadValues(platform);
    }

    get id() { return this._id; }
    get exists() { return this._id !== 0; }
    
    async saveAsync(){
        const data = {
            name: this.name,
            description: this.description
        }

        if(!this.exists){
            await this._connection.runTransactionAsync(async () => {
                await this._connection.insertAsync(TABLE, data);
                this._id = await this._connection.getLastIdAsync();
            });
        }
        else {
            return this._connection.updateByKeysAsync(TABLE, data, { id: this._id });
        }
    }

    async loadAsync(){
        const row = await this._connection.getByKeysAsync<Platform>(TABLE, { id: this._id });
        this._loadValues(row);
    }

    private _loadValues(platform: Platform){
        this._id = platform.id || 0;
        this.name = platform.name;
        this.description = platform.description;
    }
}