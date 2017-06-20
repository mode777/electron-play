import { Component, OnInit, Input } from '@angular/core';
import { NavigationComponent } from "../tv/index";

@Component({
    selector: 'tv-row-item',
    template: `
        <md-card class="tv-row-item" [ngClass]="{ 'selected': selected }" [style.width]="width + 'px'" [style.height]="height + 'px'">
            <ng-content></ng-content>
        </md-card>
    `,
    styles: [`
        .tv-row-item {
            margin: 5px;
            background-color: #ddd;
            display: inline-block;
            border-radius: 0px;
            transform: scale(1);
            z-index: initial;
            transition: transform 50ms ease-out;
            vertical-align: top;
        }

        .tv-row-item.selected {
            background-color: #eee;
            transform: scale(1.2);
            z-index: 99;
            box-shadow: 0 5px 12px 4px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
            transition: transform 150ms ease-in-out;
        }
    `]
})

export class TvRowItemComponent extends NavigationComponent { 

    @Input() height = 130;
    @Input() width = 100;
    @Input() selected = false;

    constructor() {
        super();
    }

    focus() {
        this.selected = true;
    }
    unfocus() {
        this.selected = false;
    }
}