import { Component, OnInit, Input, trigger, state, transition, style, animate } from '@angular/core';

@Component({
    selector: 'tv-slider',
    template: `
        <div class="tv-panel"
            [@sliderState]="getSliderState()" 
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
            display: flex;
            box-shadow: 0 2px 6px 5px rgba(0,0,0,.5);
            overflow: hidden;
            flex-direction: column;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    `],
    animations: [
        trigger('sliderState', [
            state('inactive-left', style({
                transform: 'translateX(-100%)'
            })),
            state('inactive-right',   style({
                transform: 'translateX(100%)'
            })),
            state('active',   style({
                transform: 'translateX(0)'
            })),
            transition('* => active', animate('500ms ease-out')),
            transition('active => *', animate('500ms ease-in'))
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

    private getSliderState(){
        return this.open ? "active" : `inactive-${this.position}`;
    }
}