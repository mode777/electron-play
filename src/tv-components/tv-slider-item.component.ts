import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'tv-slider-item',
    template: `
        <div class="slider-item" [style.color]="color" >
            <div [@state]="_state" class="bg" [style.background-color]="highlight"></div>
            <md-icon *ngIf="!!icon" class="icon">{{icon}}</md-icon>
            <ng-content style="height: 32px"></ng-content>
        </div>
    `,
    styles: [`
        .bg {
            left: -32px;
            right: -32px;
            height: 100%;
            position: absolute;
        }

        .slider-item {
            position: relative;
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: 16px;
            padding-left: 32px;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            font-weight: 400;
        }
        .icon {
            margin-right: 20px;
            font-size:32px;
            width: 32px;
            height: 32px;
        }
    `],
    animations: [
        trigger('state', [
            state('inactive', style({
                opacity: 0.0
            })),
            state('active',   style({
                opacity: 0.1
            })),
            transition('inactive <=> active', animate('100ms ease-in')),
        ])
    ]
})

export class TvSliderItemComponent implements OnInit {
    @Input() color = "white";
    @Input() icon = null;
    @Input() highlight = "white";
    @Input() active = false;

    constructor() { }

    ngOnInit() { }

    get _state() {
        return this.active ? "active" : "inactive";
    }
}