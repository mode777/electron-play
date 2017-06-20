import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvInputService, NavigationComponent } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'tv-row',
    template: `
        <div class="tv-row-wrapper">
            <div *ngIf="!!title" class="tv-row-heading">{{title}}</div>
            <div class="tv-row" [style.margin-left]="offset+'px'">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .tv-row-wrapper {
            overflow: hidden;
        }
        .tv-row {
            padding: 10px;
            position: relative;  
            white-space: nowrap;
            transition: margin 100ms; 
            vertical-align: top;         
        }
        .tv-row-heading {
            margin-top: 50px;
            margin-left: 50px;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 20px;
            color: white;
        }
    `]
})
export class TvRowComponent extends NavigationComponent implements AfterContentInit {

    @ContentChildren(TvRowItemComponent) items: QueryList<TvRowItemComponent>;
    @Input() title: string = null;

    private _itemsTotal = 0;
    private _selectedIndex = -1;
    private _focused = true;
    private _contentLoaded = false;
    private offset = 50;

    constructor(private _input: TvInputService) {
        super();
     }

    ngAfterContentInit(): void {
        this._initInput();
        // select initial item.
        this.items.forEach((item, i) => {
            if(this._selectedIndex !== -1)
                item.selected = false;
            else if(item.selected)
                this._selectedIndex = i;
        });

        this._contentLoaded = true;
        this.items.changes.forEach(x => this._onItemsChanged());
    }

    private _onItemsChanged(){
        this._initSelection();
        if(this._focused){
            this.focusItem();
        }
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
        console.log(this._itemsTotal)

        if(this._selectedIndex >= this._itemsTotal)
            this._selectedIndex = this._itemsTotal -1;        
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
            this.offset += this.items.toArray()[this._selectedIndex].width;
            this._selectedIndex--;
            this.focusItem();
        }
    }

    protected moveForward(){
        if(this._selectedIndex !== -1 && this._selectedIndex < this._itemsTotal-1){
            this._selectedIndex++;
            this.offset -= this.items.toArray()[this._selectedIndex].width;
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