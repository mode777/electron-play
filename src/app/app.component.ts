import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'app-root',
    template: `
        <tv-input></tv-input>
        <rp-header title="{{title}}"></rp-header>
        <!--<rp-platform></rp-platform>-->
        <tv-row title="Recommended">
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item [width]="200"></tv-row-item>
            <tv-row-item [selected]="true"></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item [width]="200"></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item [width]="75"></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
        </tv-row>
        <tv-row title="Recent">
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
        </tv-row>
        <tv-row>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
            <tv-row-item></tv-row-item>
        </tv-row>
    `, 
    styles: [`
    `]
})
export class AppComponent {
    title = "RetroPlay";

    constructor(private _input: TvInputService){
        this._input.up.throttle(ev => Observable.interval(200)).forEach(x => console.log("up"));
    }
}
