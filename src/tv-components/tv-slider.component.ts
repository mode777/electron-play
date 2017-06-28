import { Component, OnInit, Input, trigger, state, transition, style, animate } from '@angular/core';
import { sliderStyle } from "./style/tv-slider.style";

@Component({
    selector: 'tv-slider',
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            position: absolute;
            top: 0;
            bottom: 0;
            display: flex;
            box-shadow: ${sliderStyle.shadow};
            overflow: hidden;
            flex-direction: column;
        }
        :host(.left) {
            left: 0;
        }
        :host(.right) {
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
            transition('* => active', animate(sliderStyle.openAnimation)),
            transition('active => *', animate(sliderStyle.closeAnimation))
        ])
    ],
    host: {"[@sliderState]":"getSliderState()",
            "[style.width]":"width", 
            "[class]": "position", 
            "[style.backgroundColor]":"backgroundColor"}
})

export class TvSliderComponent implements OnInit {
    @Input() width = sliderStyle.defaultWidth;
    @Input() position: "left"|"right" = <"left" | "right">sliderStyle.defaultPosition;
    @Input() backgroundColor = sliderStyle.backgroundColor;
    @Input() open = false;
    
    constructor() { }
    
    ngOnInit(): void {
    }

    private getSliderState(){
        return this.open ? "active" : `inactive-${this.position}`;
    }
}