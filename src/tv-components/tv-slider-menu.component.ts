import { Component, OnInit, ContentChildren, QueryList, ViewChild, AfterContentInit } from '@angular/core';
import { Grid } from "./grid";
import { TvSliderItemComponent } from "./tv-slider-item.component";
import { TvInputService } from "../tv";
import { TvScrollViewComponent } from "./tv-scroll-view.component";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'tv-slider-menu',
    template: `
        <tv-scroll-view [target]="focusedItem">
            <ng-content></ng-content>
        </tv-scroll-view>
    `,
    styles: [`
    
    `]
})

export class TvSliderMenuComponent extends Grid<TvSliderItemComponent> implements AfterContentInit {
    @ContentChildren(TvSliderItemComponent) query: QueryList<TvSliderItemComponent>;
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