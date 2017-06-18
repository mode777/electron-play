import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlatformSource, PlatformModel } from "../../db.retro-play";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'rp-platform',
    template: `
        <model-item class="rp-card" *ngFor="let platform of platforms | async" [source]="source" [model]="platform">
            <model-view>
                <md-card-title> {{platform.name}}</md-card-title>
                <md-card-subtitle>{{platform.description}}</md-card-subtitle>
                <md-card-content>{{platform.id}}</md-card-content>
            </model-view>
            <model-edit>
                <md-input-container>
                    <input mdInput placeholder="Name" [(value)]="platform.name">
                </md-input-container>
                <md-input-container>
                    <input mdInput placeholder="Descriptions" [(value)]="platform.description">
                </md-input-container>
            </model-edit>
        </model-item>
    `,
    styles: []
})
export class PlatformComponent {

    platforms: Observable<PlatformModel[]>;

    constructor(public source: PlatformSource){
        this.platforms = source.observe();
    }
}