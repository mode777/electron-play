import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fs from 'fs';
import { DbConnection } from "../db";

export interface Platform {
    id: number,
    name: string
}

@Component({
    selector: 'app-root',
    template: `

    <rp-header title="RetroPlay"></rp-header>
    <rp-platform *ngFor="let platform of platforms" [model]="platform"></rp-platform>
    
    `, 
    styles: [`
    `]
})
export class AppComponent implements OnInit {

    private readonly _connection: DbConnection;

    platforms: Platform[] = [];

    constructor(){
        this._connection = new DbConnection("../assets/dev_db.db");

    }

    async ngOnInit() {
        const conn = this._connection;

        await conn.runTransactionAsync(async () => {
            await conn.executeAsync("delete from platforms");
            await conn.insertAsync("platforms", { name: "My Platform", description: "A home console released by Nintendo in 1989" });
            const myId = await conn.getLastIdAsync();
            await conn.insertAsync("platforms", { name: "Sega Megadrive", description: "A home console released by SEGA in 1988" });
            await conn.updateByKeysAsync("platforms", { name: "Super Nintendo" }, { id: myId });
        });
                
        this.platforms = await conn.queryAsync<Platform>("select * from platforms");        
    }


}
