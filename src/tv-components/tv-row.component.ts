import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvInputService, NavigationComponent } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'tv-row',
    template: `
        <div class="tv-row">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .tv-row {
            margin: 40px;
            position: relative;            
        }
    `]
})

export class TvRowComponent extends NavigationComponent implements AfterContentInit {

    @ContentChildren(TvRowItemComponent) items: QueryList<TvRowItemComponent>;

    private _itemsTotal = 0;
    private _selectedIndex = -1;
    private _focused = true;
    private _contentLoaded = false;

    constructor(private _input: TvInputService) {
        super();
     }

    ngAfterContentInit(): void {
        this._initSelection();     
        this._initInput();
        if(this._focused){
            this.focusItem();
        }
        this._contentLoaded = true;
    }

    public selectIndex(){
        this.items.forEach((item, i) => {
            if(i === this._selectedIndex)
                item.selected = true;
            else
                item.selected = false;
        });
    }

    private _initInput(){
        this._input.right
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveForward());
        this._input.left
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveBack())
    }

    private _initSelection(){
        this._itemsTotal = this.items.length;
        this._selectedIndex = -1;
        this.items.forEach((item, i) => {
            if(this._selectedIndex !== -1)
                item.selected = false;
            else if(item.selected)
                this._selectedIndex = i;
        });
    }

    protected focusItem(){
        if(this._focused && this._selectedIndex !== -1 )
        {
            this.items.forEach((item, i) => {
                if(this._selectedIndex === i)
                    item.focus();
                else
                    item.unfocus();
            });
        }
    }

    protected moveBack(){
        if(this._selectedIndex !== -1 && this._selectedIndex > 0){
            this._selectedIndex--;
            this.focusItem();
        }
    }

    protected moveForward(){
        if(this._selectedIndex !== -1 && this._selectedIndex < this._itemsTotal-1){
            this._selectedIndex++;
            this.focusItem();
        }
    }


    focus() {
        this._focused = true;
        if(this._contentLoaded && this._itemsTotal > 0){
            this.focusItem();
        }
    }

    unfocus() {
        this._focused = false;
    }

}