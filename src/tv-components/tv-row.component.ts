import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvInputService, NavigationComponent } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { ListComponent } from "./list.component";

@Component({
    selector: 'tv-row',
    template: `
        <div class="tv-row-wrapper" [ngClass]="{ 'selected': hasFocus }" [style.height]="height+'px'">
            <div *ngIf="!!title" class="tv-row-heading">{{title}}</div>
            <div class="tv-row" [style.margin-left]="_offset+'px'">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .tv-row-wrapper {
            overflow: hidden;
            opacity: .5;
            transition: opacity 150ms ease-out; 
        }
        .tv-row-wrapper.selected {
            opacity: 1;
            transition: opacity 150ms ease-in; 
        }
        .tv-row {
            padding: 20px;
            position: relative;  
            white-space: nowrap;
            transition: margin 150ms; 
            vertical-align: top;         
        }
        .tv-row-heading {
            margin-top: 0px;
            margin-left: 50px;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 20px;
            color: white;
        }
    `]
})
export class TvRowComponent extends ListComponent<TvRowItemComponent> implements AfterContentInit {

    @ContentChildren(TvRowItemComponent) query: QueryList<TvRowItemComponent>;
    @Input() title: string = null;
    @Input() selected = false;
    @Input() height = 250;

    private _offset = 50;
    
    constructor(private _input: TvInputService, private _el: ElementRef) {
        super();

     }


    ngAfterContentInit(): void {
        this.updateItems(this.query.toArray());        
        this.query.changes.forEach(() => this.updateItems(this.query.toArray()));
        this._initInput();
    }

    private _initInput(){
        this._input.right
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveForward());
        this._input.left
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveBack());

        this.movedForward.forEach(() => this._offset -= this.items[this.selectedIndex].width)
        this.movedBack.forEach(() => this._offset += this.items[this.selectedIndex+1].width);
    }
}