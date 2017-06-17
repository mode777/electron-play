import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DbConnection } from "../../db/index";

export interface Platform {
    id: number,
    name: string
}

@Component({
    selector: 'rp-platform-list',
    template: `
    <rp-platform *ngFor="let platform of platforms" [model]="platform" (destroy)="destroy(platform)"></rp-platform>
    `, 
    styles: [`
    `]
})
export class PlatformListComponent implements OnInit {

    private readonly _connection: DbConnection;

    platforms: Platform[] = [];

    constructor(){
        this._connection = new DbConnection("../assets/dev_db.db");
    }

    destroy(platform: Platform){
        const index = this.platforms.indexOf(platform);
        if(index !== -1){
            this.platforms.splice(index, 1);
        }
    }

    async ngOnInit() {
        const conn = this._connection;

        await conn.runTransactionAsync(async () => {
            await conn.executeAsync("delete from platforms");
            await conn.insertAsync("platforms", { name: "Super Nintendo", description: "A home console released by Nintendo in 1989" });
            await conn.insertAsync("platforms", { name: "Sega Megadrive", description: "A home console released by SEGA in 1988" });
            await conn.insertAsync("platforms", { name: "NeoGeo", description: "Originally an arcade console by SNK." });
        });
                
        this.platforms = await conn.queryAsync<Platform>("select * from platforms");        
    }
}