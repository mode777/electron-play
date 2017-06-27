import { Component, OnInit, Input, trigger, state, style, transition, animate, EventEmitter, Output, ElementRef } from '@angular/core';
import { Selectable } from "./interfaces";
import { GridItem } from "./grid-item";
import { TvInputService } from "../tv";
import { Observable } from "rxjs";

import { menuStyle as _style } from "./style";

@Component({
    selector: 'tv-menu-item',
    template: `
        <div class="slider-item" [style.color]="color" >
            <div [@state]="_state" class="bg" [style.background-color]="highlight"></div>
            <md-icon *ngIf="!!icon" class="icon">{{icon}}</md-icon>
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .bg {
            left: -${_style.left};
            right: -${_style.left};
            height: 100%;
            position: absolute;
        }

        .slider-item {
            position: relative;
            display: flex;
            align-items: ${_style.item.alignV};
            flex-direction: row;
            padding: ${_style.item.padding};
            padding-left: ${_style.left};
            font-family: ${_style.item.fontFamily};
            font-size: ${_style.item.fontSize};
            font-weight: ${_style.item.fontWeight};
        }
        .icon {
            display: flex;
            margin-right: ${_style.item.icon.marginRight};
            font-size: ${_style.item.icon.fontSize};
            width: ${_style.item.icon.fontSize};
            height: ${_style.item.icon.fontSize};
        }
    `],
    animations: [
        trigger('state', [
            state('inactive', style({
                opacity: 0.0
            })),
            state('active',   style({
                opacity: _style.item.activeOpacity
            })),
            transition('inactive => active', animate(_style.item.activeAnimation)),
            transition('active => inactive', animate(_style.item.inactiveAnimation)),
        ])
    ]
})

export class TvMenuItemComponent extends GridItem implements Selectable {
    
    
    @Input() color = _style.item.defaultColor;
    @Input() icon = null;
    @Input() highlight = _style.item.defaultHightlight;

    @Output() onSelect = new EventEmitter<void>();

    constructor(public readonly element: ElementRef, private _input: TvInputService) {
        super();
        Observable
        this._input.select.debounce(() => Observable.interval(50))
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