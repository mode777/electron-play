import { Component, OnInit, Input, trigger, state, transition, style, animate } from '@angular/core';

@Component({
    selector: 'tv-panel',
    template: `
        <div class="tv-panel" [style.width]="width + 'px'" [ngClass]="position" [style.backgroundColor]="backgroundColor">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .tv-panel {
            position: absolute;
            top: 0;
            bottom: 0;
            box-shadow: 0 2px 12px 5px rgba(0,0,0,.5);
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    `],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})

export class TvPanelComponent {
    @Input() width = 480;
    @Input() position: "left"|"right" = "right";
    @Input() backgroundColor = "#263238";
    
    constructor() { }
}