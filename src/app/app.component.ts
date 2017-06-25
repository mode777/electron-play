import { Component, OnInit, ChangeDetectorRef, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { PlatformSource, PlatformModel } from "../db.retro-play";
import { TvScreenService, TvSliderMenuComponent } from "../tv-components";

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <tv-screen>
            
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
             
            <tv-slider [open]="sliderOpen" width="480px">
                <tv-slider-title>Settings</tv-slider-title>
                <tv-slider-menu #menu>
                    <tv-slider-heading>Device</tv-slider-heading>
                    <tv-slider-item icon="network_wifi">Network</tv-slider-item>
                    <tv-slider-item icon="volume_up">Sound</tv-slider-item>
                    <tv-slider-item icon="android">Apps</tv-slider-item>
                    <tv-slider-item icon="tv">Screensaver</tv-slider-item>
                    <tv-slider-item icon="storage">Storage</tv-slider-item>
                    <tv-slider-item icon="info_outline">About</tv-slider-item>
                    <tv-slider-heading>Device</tv-slider-heading>
                </tv-slider-menu>
            </tv-slider>
        </tv-screen>
        
        <!--<rp-header title="{{title}}"></rp-header>
        <rp-platform></rp-platform>-->
    `, 
    styles: [`
    `]
})
export class AppComponent implements AfterContentInit {
    @ViewChild('menu') menu: TvSliderMenuComponent; 
    title = "RetroPlay";
    platforms: Observable<PlatformModel[]>
    sliderOpen = false;

    constructor(public source: PlatformSource, private _service: TvScreenService){
        this.platforms = source.observe();
    }

    ngAfterContentInit(): void {
        console.log(this.menu);
        this.menu.activate();

        const images = ["./srcA.jpg","./srcB.jpg"]
        let idx = 0;
        this._service.changeImage(images[idx++]);
        setInterval(() => {
            this._service.changeImage(images[idx++ % images.length]);
        }, 5000)

        setTimeout(() => {
            this.sliderOpen = true;
        }, 200);
    }
}
