import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { TvScreenService } from "./tv-screen.service";

@Component({
    selector: 'tv-screen',
    template: `
        <div class="max screen">
            <div *ngIf="_srcB" class="max fill">
                <img [src]="_srcB"/>
            </div>
            <div *ngIf="_srcA" class="abc max fill" [ngClass]="{ active: _active }" >
                <img [src]="_srcA"/>
            </div>
            <div class="max overlay" [style.opacity]="opacity"></div>
        </div>
    `,
    styles: [`    
        .screen {
            background-color: white;
        }        
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
        .abc {
            color: black;
            opacity: 0.0;
        }
        .active {
            opacity: 1;
            transition: opacity 500ms ease-out;
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
    private _active = false;
    private _srcA = null;
    private _srcB = null;
    
    constructor(private _service: TvScreenService) {
        this._service.imageChanged.forEach(src => {
            this._active = false;        
            this._srcB = this._srcA;
            this._srcA = src;
            setTimeout(() => {
                this._active = true;        
            }, 1);
        });
     }
}