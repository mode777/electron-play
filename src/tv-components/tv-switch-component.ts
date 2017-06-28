import { Component, OnInit, trigger, state, style, transition, animate, Input } from '@angular/core';
import { switchStyle } from "./style/tv-switch.style";

@Component({
    selector: 'tv-switch',
    template: `
        <div class="container">
            <div [@triggerRail]="state" class="rail"></div>
            <div [@triggerKnob]="state" class="knob"></div>
        </div>
    `,
    styles: [`
        .container {
            display: flex;
            position: relative;
            width: ${switchStyle.width};
            height: ${switchStyle.height};
        }
        .rail {
            display: flex;
            position: absolute;
            left: ${switchStyle.rail.left};
            top: ${switchStyle.rail.top};
            height: ${switchStyle.rail.height};
            width: ${switchStyle.rail.width};
            border-radius: ${switchStyle.rail.borderRadius};
            opacity: ${switchStyle.rail.opacity};
        }
        .knob {
            display: flex;
            position: absolute;
            top: ${switchStyle.knob.top};
            height: ${switchStyle.knob.diameter};
            width:${switchStyle.knob.diameter};
            border-radius: 50%;
        }
    `],
    animations: [
        trigger('triggerRail', [
            state('on' , style({ backgroundColor: switchStyle.colorOn })),
            state('off', style({ backgroundColor: switchStyle.colorOff  })),
            transition('on <=> off', animate(switchStyle.animation))
        ]),
        trigger('triggerKnob', [
            state('on' , style({ backgroundColor: "#7dc7c0", left: switchStyle.knob.leftOn })),
            state('off', style({ backgroundColor: "#b9b9b9", left: switchStyle.knob.leftOff })),
            transition('on <=> off', animate(switchStyle.animation))
        ]),
    ]
})

export class TvSwitchComponent implements OnInit {
    @Input() checked: boolean;
    
    constructor() { }

    ngOnInit() { }

    get state() {
        return this.checked ? "on" : "off";
    }
}