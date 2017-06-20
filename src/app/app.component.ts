import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { PlatformSource, PlatformModel } from "../db.retro-play";

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <rp-header title="{{title}}"></rp-header>
        <!--<rp-platform></rp-platform>-->
        <tv-lane>
            <tv-row title="Recommended" [selected]="true">
                <tv-row-item [selected]="true"></tv-row-item>
                <tv-row-item *ngFor="let platform of platforms | async">
                    {{platform.name}}
                </tv-row-item>
            </tv-row>
            <tv-row title="Last played">
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
            </tv-row>
             <tv-row title="By platformd">
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
            </tv-row>
            <tv-row title="By Genre">
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
                <tv-row-item></tv-row-item>
            </tv-row>
        </tv-lane>
        
    `, 
    styles: [`
    `]
})
export class AppComponent implements OnInit {
    title = "RetroPlay";
    platforms: Observable<PlatformModel[]>

    constructor(public source: PlatformSource){
        this.platforms = source.observe();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.source.addByNameAsync("My Platform", "My platform desc");
        }, 2000);
    }
}
