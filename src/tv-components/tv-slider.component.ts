import { Component, OnInit, Input, trigger, state, transition, style, animate } from '@angular/core';

@Component({
    selector: 'tv-slider',
    template: `
        <div class="tv-panel" 
            *ngIf="open"
            [@slideIn] 
            [style.width]="width" 
            [ngClass]="position" 
            [style.backgroundColor]="backgroundColor">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .tv-panel {
            position: absolute;
            top: 0;
            bottom: 0;
            box-shadow: 0 2px 6px 5px rgba(0,0,0,.5);
            overflow: hidden;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    `],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({transform:"translate(100%,0)"}),
                animate("500ms ease-out", style({transform:"translate(0,0)"})) 
            ]),
                transition(':leave', [   // :leave is alias to '* => void'
                animate(500, style({opacity:0})) 
            ])
        ])
    ]
})

export class TvSliderComponent implements OnInit {
    @Input() width = "40%";
    @Input() position: "left"|"right" = "right";
    @Input() backgroundColor = "#263238";
    @Input() open = true;
    
    constructor() { }
    
    ngOnInit(): void {
    }
}