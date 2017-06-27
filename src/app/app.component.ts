import { Component, OnInit, ChangeDetectorRef, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { PlatformSource, PlatformModel } from "../db.retro-play";
import { TvScreenService, TvMenuComponent } from "../tv-components";

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <tv-screen>
            
            <!--<tv-lane>
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
            </tv-lane>   -->  

            <tv-menu #menu [open]="sliderOpen" title="Settings">
                <tv-menu-heading>Device</tv-menu-heading>
                <tv-menu-item icon="network_wifi">Network</tv-menu-item>
                <tv-menu-item icon="volume_up">Sound</tv-menu-item>
                <tv-menu-item icon="android">Apps</tv-menu-item>
                <tv-menu-item icon="tv">Screensaver</tv-menu-item>
                <tv-menu-item icon="storage">Storage</tv-menu-item>
                <tv-menu-item icon="info_outline">About</tv-menu-item>
                <tv-menu-heading>Preferences</tv-menu-heading>
                <tv-menu-item icon="access_time">Date &amp; time</tv-menu-item>
                <tv-menu-item icon="language">Language</tv-menu-item>
                <tv-menu-item icon="keyboard">Keyboard</tv-menu-item>
                <tv-menu-item icon="home">Home screen</tv-menu-item>
                <tv-menu-item icon="search">Search</tv-menu-item>
                <tv-menu-item icon="mic">Speech</tv-menu-item>
                <tv-menu-item icon="accessibility">Accessibility</tv-menu-item>
                <tv-menu-heading>Personal</tv-menu-heading>
                <tv-menu-item icon="location_on">Location</tv-menu-item>
                <tv-menu-item icon="lock">Security &amp; restrictions</tv-menu-item>
                <tv-menu-item icon="timeline">Usage &amp; diagnostics</tv-menu-item>
                <tv-menu-heading>Accounts</tv-menu-heading>
                <tv-menu-item icon="add">Add account</tv-menu-item>
                <tv-menu-switch>Enable Wifi</tv-menu-switch>
            </tv-menu>  
                       
        
        <!--<rp-header title="{{title}}"></rp-header>
        <rp-platform></rp-platform>-->
    `, 
    styles: [`
    `]
})
export class AppComponent implements AfterContentInit {
    @ViewChild('menu') menu: TvMenuComponent; 
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
