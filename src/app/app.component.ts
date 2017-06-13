import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';
import { DbConnection } from "../db";

export interface Platform {
    id: number,
    name: string
}

@Component({
    selector: 'app-root',
    templateUrl: '../static/templates/app.component.html',
    styleUrls: ['../static/style/app.component.css']
})
export class AppComponent implements OnInit {

    private readonly _connection: DbConnection;

    title = 'RetroPlay';
    platforms: Platform[] = [];

    constructor(){
        this._connection = new DbConnection("../assets/dev_db.db");
    }

    ngOnInit(): void {
        this.platforms = this._connection
            .query<Platform>("select * from platforms");
        
    }
}
