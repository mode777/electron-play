import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { TvScreenService } from "./tv-screen.service";

import { asap } from 'rxjs/scheduler/asap';
import { Scheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'tv-screen',
    template: `
        <div class="max viewport">
            <div *ngIf="_srcB" class="max fill" [style.background-color]="backgroundColor">
                <img [src]="_srcB"/>
            </div>
            <div *ngIf="_srcA" class="imgA max fill" [@active]="state">
                <img [src]="_srcA" (load)="imageLoaded()"/>
            </div>
            <div class="max overlay" [style.opacity]="opacity" [style.background-color]="overlayColor"></div>
            <ng-content></ng-content>
        </div>
    `,
    animations: [
        trigger('active', [
            state('inactive', style({
                opacity: 0.0
            })),
            state('active',   style({
                opacity: 1.0
            })),
            transition('inactive => active', animate('500ms ease-in'))
        ])
    ],
    styles: [`    
        .viewport {
            display: flex;
        }   
        .max {
            position: absolute;
            height:100%;
            width:100%;
            overflow: hidden;
        }
        .overlay {
            background-color: black;
        }
        .fill {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden
        }
        .fill img {
            flex-shrink: 0;
            min-width: 100%;
            min-height: 100%
        }
    `]
})

export class TvScreenComponent {
    @Input() opacity: number = 0.5;
    @Input() overlayColor = "black";
    @Input() backgroundColor: "#003";
    //private _active = false;
    private _srcA = null;
    private _srcB = null;
    state = "inactive;"
    
    constructor(private _service: TvScreenService) {
        // TODO: Use 'inspectTime' for throttle once it is released
        this._service.imageChanged.forEach(src => {
            this.state = "inactive";      
            this._srcB = this._srcA;
            this._srcA = src;
        });
     }

     imageLoaded(){
        this.state = "active";
     }
}