import { Component, OnInit, ContentChildren, QueryList, ViewChild, AfterContentInit, Input } from '@angular/core';
import { Grid } from "./grid";
import { TvMenuItemComponent } from "./tv-menu-item.component";
import { TvInputService } from "../tv";
import { TvScrollViewComponent } from "./tv-scroll-view.component";
import { Observable } from "rxjs/Rx";
import { menuStyle } from "./style/index";

@Component({
    selector: 'tv-menu',
    template: `
        <tv-slider [open]="open" width="${menuStyle.width}" position="${menuStyle.position}">
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
            top: ${menuStyle.offsetTop};
            padding-bottom: ${menuStyle.paddingBottom};
        }
    `]
})

export class TvMenuComponent extends Grid<TvMenuItemComponent> implements AfterContentInit {
    
    @Input() title = menuStyle.defaultTitle;
    @Input() open = menuStyle.defaultOpen;

    @ContentChildren(TvMenuItemComponent) query: QueryList<TvMenuItemComponent>;
    @ViewChild(TvScrollViewComponent) scrollView: TvScrollViewComponent;
    
    constructor(private _input: TvInputService) { 
        super("row", 1);
    }

    private _updateItems(){
        const arr = this.query.toArray();
        this.setItems(arr);
    }

    ngAfterContentInit(): void {
        this.query.changes.forEach(() => this._updateItems());
        this._updateItems();

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