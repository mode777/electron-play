import { Component, OnInit, Input, trigger, state, style, transition, animate, EventEmitter, Output, ElementRef } from '@angular/core';
import { Selectable } from "./interfaces";
import { GridItem } from "./grid-item";
import { TvInputService } from "../tv";
import { Observable } from "rxjs";

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

export class TvSliderItemComponent extends GridItem implements Selectable {
    
    element: ElementRef;

    @Input() color = "white";
    @Input() icon = null;
    @Input() highlight = "white";

    @Output() onSelect = new EventEmitter<void>();

    constructor(private _input: TvInputService) {
        super();
        Observable
        this._input.select.debounce(() => Observable.interval(500))
            .forEach(ev => this.select());
     }

    select() {
        if(this.hasFocus && this.isActive){
            this.onSelect.emit();
        }
    }

    get _state() {
        return this.hasFocus ? "active" : "inactive";
    }
}