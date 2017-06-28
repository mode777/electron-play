import { Component, OnInit, Input, trigger, state, style, transition, animate, EventEmitter, Output, ElementRef } from '@angular/core';
import { Selectable } from "./interfaces";
import { GridItem } from "./grid-item";
import { TvInputService } from "../tv";
import { Observable } from "rxjs";

import { menuStyle } from "./style";

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
            left: -${menuStyle.paddingLeft};
            right: -${menuStyle.paddingLeft};
            height: 100%;
            position: absolute;
        }

        .slider-item {
            position: relative;
            display: flex;
            align-items: ${menuStyle.item.alignV};
            flex-direction: row;
            padding: ${menuStyle.item.padding};
            padding-left: ${menuStyle.paddingLeft};
            font-family: ${menuStyle.item.fontFamily};
            font-size: ${menuStyle.item.fontSize};
            font-weight: ${menuStyle.item.fontWeight};
        }
        .icon {
            display: flex;
            margin-right: ${menuStyle.item.icon.marginRight};
            font-size: ${menuStyle.item.icon.fontSize};
            width: ${menuStyle.item.icon.fontSize};
            height: ${menuStyle.item.icon.fontSize};
        }
    `],
    animations: [
        trigger('state', [
            state('inactive', style({
                opacity: 0.0
            })),
            state('active',   style({
                opacity: menuStyle.item.activeOpacity
            })),
            transition('inactive => active', animate(menuStyle.item.activeAnimation)),
            transition('active => inactive', animate(menuStyle.item.inactiveAnimation)),
        ])
    ]
})

export class TvMenuItemComponent extends GridItem implements Selectable {
    
    
    @Input() color = menuStyle.item.defaultColor;
    @Input() icon = null;
    @Input() highlight = menuStyle.item.defaultHightlight;

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