import { Component, OnInit, ContentChildren, QueryList, ViewChild, AfterContentInit, Input } from '@angular/core';
import { Grid } from "./grid";
import { TvMenuItemComponent } from "./tv-menu-item.component";
import { TvInputService } from "../tv";
import { TvScrollViewComponent } from "./tv-scroll-view.component";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'tv-menu',
    template: `
        <tv-slider [open]="open" width="480px" position="right">
            <tv-slider-title>{{title}}</tv-slider-title>
            <tv-scroll-view class="slider-menu" [target]="focusedItem.element">
                <ng-content></ng-content>
            </tv-scroll-view>
        </tv-slider>
    `,
    styles: [`
        .slider-menu {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 128px;
            padding-bottom: 64px;
        }
    `]
})

export class TvMenuComponent extends Grid<TvMenuItemComponent> implements AfterContentInit {
    @Input() title = "Menu";
    @Input() open = false;
    @ContentChildren(TvMenuItemComponent) query: QueryList<TvMenuItemComponent>;
    @ViewChild(TvScrollViewComponent) scrollView: TvScrollViewComponent;
    
    constructor(private _input: TvInputService) { 
        super("row", 1);
    }

    ngAfterContentInit(): void {
        console.log(this.query);
        this.setItems(this.query.toArray());
        this.query.changes.forEach(() => this.setItems(this.query.toArray()));

        this.onItemsChanged.forEach(() => this.scrollView.update());
        this.onFocusChanged.forEach(() => this.scrollView.update());

        this._input.up
            .throttle(() => Observable.interval(100))
            .forEach(() => this.moveUp());

        this._input.down
            .throttle(() => Observable.interval(100))
            .forEach(() => this.moveDown());

        this._input.left
            .throttle(() => Observable.interval(100))
            .forEach(() => this.moveLeft());

        this._input.right
            .throttle(() => Observable.interval(100))
            .forEach(() => this.moveRight());
    }
}