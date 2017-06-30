import { Injectable } from '@angular/core';

import { Sqlite3Connection } from "../db";
import * as path from "path";
import { RetroPlayInitializer } from "./retro-play.initializer";

@Injectable()
export class RetroPlayConnection extends Sqlite3Connection {
    constructor(initializer: RetroPlayInitializer){
        super(initializer, "assets/dev_db.s3db");
    }
}