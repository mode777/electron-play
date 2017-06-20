import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, EventEmitter } from '@angular/core';
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvInputService, NavigationComponent } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';

export abstract class ListComponent<T extends NavigationComponent> extends NavigationComponent {

    private _itemsTotal = 0;
    private _items: T[];
    private _selectedIndex = -1;
    private _focused = true;
    private _initialized = false;

    public movedForward = new EventEmitter<void>();
    public movedBack = new EventEmitter<void>();
    
    constructor() {
        super();
    }

    get itemsTotal() { return this._itemsTotal; }
    get items() { return this._items; }
    get selectedIndex() { return this._selectedIndex; }
    get height() { return 200; }
    get hasFocus() { return this._focused; }
        
    public selectIndex(){
        this._items.forEach((item, i) => {
            if(i === this._selectedIndex)
                item.selected = true;
            else
                item.selected = false;
        });
    }

    protected focusItem(){
        if(this._focused && this._selectedIndex !== -1 )
        {
            this._items.forEach((item, i) => {
                if(this._selectedIndex === i)
                    item.focus();
                else
                    item.unfocus();
            });
        }
    }

    protected moveBack(){
        if(this.hasFocus && this._selectedIndex !== -1 && this._selectedIndex > 0){
            this._selectedIndex--;
            this.focusItem();
            this.movedBack.emit();
        }
    }

    protected moveForward(){
        console.log(this.items);
        if(this.hasFocus &&  this._selectedIndex !== -1 && this._selectedIndex < this._itemsTotal-1){
            this._selectedIndex++;
            this.focusItem();
            this.movedForward.emit();
        }
    }

    focus() {
        this._focused = true;
        if(this._initialized && this._itemsTotal > 0){
            this.focusItem();
        }
    }

    unfocus() {
        this._focused = false;
        this.items.forEach(x => x.unfocus());
    }

    protected updateItems(items: T[]){

        this._items = items;
        this._itemsTotal = this._items.length;

        if(this._selectedIndex >= this._itemsTotal)
            this._selectedIndex = this._itemsTotal -1; 

        if(!this._initialized){
            // select initial item.
            this._items.forEach((item, i) => {
                if(this._selectedIndex !== -1)
                    item.selected = false;
                else if(item.selected)
                    this._selectedIndex = i;
            });
            this._initialized = true;
            if(this._selectedIndex == -1 && this.itemsTotal > 0){
                this._selectedIndex = 0;
            }
        }       

        if(this._focused){
            this.focusItem();
        }

        console.log(this._itemsTotal, this._selectedIndex)
        
    }

}