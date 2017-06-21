import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { PlatformSource, PlatformModel } from "../db.retro-play";
import { TvScreenService } from "../tv-components";

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <tv-screen></tv-screen>
        
        <!--<rp-header title="{{title}}"></rp-header>
        <rp-platform></rp-platform>-->

        <!--
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
        -->
    `, 
    styles: [`
    `]
})
export class AppComponent implements AfterContentInit {
    title = "RetroPlay";
    platforms: Observable<PlatformModel[]>

    constructor(public source: PlatformSource, private _service: TvScreenService){
        this.platforms = source.observe();
    }

    ngAfterContentInit(): void {
        this._service.changeImage("./srcA.jpg");
        setTimeout(() => {
            this._service.changeImage("./srcB.jpg");
            this.source.addByNameAsync("My Platform", "My platform desc");
        }, 2000);
    }
}
