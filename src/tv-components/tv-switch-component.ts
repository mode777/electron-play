import { Component, OnInit, trigger, state, style, transition, animate, Input } from '@angular/core';

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
            width: 50px;
            height: 25px;
        }
        .rail {
            display: flex;
            position: absolute;
            left: 8px;
            top: 4px;
            height: 17px;
            width:35px;
            border-radius: 8px;
        }
        .knob {
            display: flex;
            position: absolute;
            top: 0px;
            height: 25px;
            width:25px;
            border-radius: 50%;
        }
    `],
    animations: [
        trigger('triggerRail', [
            state('on' , style({ backgroundColor: "#4f6d6f" })),
            state('off', style({ backgroundColor: "#767e82"  })),
            transition('on <=> off', animate('300ms ease-in-out'))
        ]),
        trigger('triggerKnob', [
            state('on' , style({ backgroundColor: "#7dc7c0", left: "26px" })),
            state('off', style({ backgroundColor: "#b9b9b9", left: "0px"  })),
            transition('on <=> off', animate('300ms ease-in-out'))
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