import { Injectable } from '@angular/core';

import { Sqlite3Connection } from "../db";

@Injectable()
export class RetroPlayConnection extends Sqlite3Connection {
    constructor(){
        super("../assets/dev_db.db");
    }
}