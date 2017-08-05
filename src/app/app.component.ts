import { Component, OnInit, ChangeDetectorRef, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { PlatformSource, PlatformModel, RetroPlayUow, RetroPlayConnection } from "../db.retro-play";
import { TvScreenService, TvMenuComponent } from "../tv-components";
import { Table, FieldTypes, Constraints, Behaviour } from "../db/index";

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <tv-screen><tv-screen>
    `, 
    styles: [`
    `]
})
export class AppComponent implements AfterContentInit {
    //@ViewChild('menu') menu: TvMenuComponent; 
    title = "RetroPlay";
    platforms: Observable<PlatformModel[]>
    sliderOpen = false;

    constructor(public connection: RetroPlayConnection, private _service: TvScreenService){
        
        this.tableTest();
    }

    ngAfterContentInit(): void {
     
        const images = ["./assets/srcA.jpg","./assets/srcB.jpg"]
        let idx = 0;
        this._service.changeImage(images[idx++]);
        setInterval(() => {
            this._service.changeImage(images[idx++ % images.length]);
        }, 5000)

        setTimeout(() => {
            this.sliderOpen = true;
        }, 200);
    }

    tableTest(){
        const uow = new RetroPlayUow(this.connection);
        console.log("testing db");
        this.testPlatforms(uow);
        this.testGames(uow);
        this.testGenres(uow);
    }

    async testPlatforms(uow: RetroPlayUow){
        const platforms = uow.platforms
        await platforms.getObservable().subscribe(all => {
            console.log(all)
        });
        var models = await platforms.getAllAsync();
        console.log(models)
        models.forEach(x => platforms.removeAsync(x));
        
    }

    async testGames(uow: RetroPlayUow){
        //const games = await uow.games.getObservable().subscribe(x => console.log(x))
        
    }

    async testGenres(uow: RetroPlayUow){
        //const genres = await uow.genres.getObservable().subscribe(x => console.log(x))

    }
}
