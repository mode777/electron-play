import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { TvScreenService } from "./tv-screen.service";

@Component({
    selector: 'tv-screen',
    template: `
        <div class="max">
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
        .max {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
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