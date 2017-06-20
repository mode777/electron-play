import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, ElementRef } from '@angular/core';
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvInputService, NavigationComponent } from "../tv";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/throttle';
import 'rxjs/add/observable/interval';
import { ListComponent } from "./list.component";
import { TvRowComponent } from "./tv-row.component";

@Component({
    selector: 'tv-lane',
    template: `
        <div class="tv-lane-wrapper">
            <!--<div *ngIf="!!title" class="tv-lane-heading">{{title}}</div>-->
            <div class="tv-lane" [style.margin-top]="_offset+'px'">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .tv-lane-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
        .tv-lane {
            padding-top: 30px;
            position: relative;  
            transition: margin 150ms; 
        }
        .tv-lane-heading {
            margin-top: 50px;
            margin-left: 50px;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 20px;
            color: white;
        }
    `]
})
export class TvLaneComponent extends ListComponent<TvRowComponent> implements AfterContentInit {

    @ContentChildren(TvRowComponent) query: QueryList<TvRowComponent>;
    @Input() title: string = null;

    private _offset = 50;
    
    constructor(private _input: TvInputService) {
        super();
     }

    ngAfterContentInit(): void {
        this.updateItems(this.query.toArray());        
        this.query.changes.forEach(() => this.updateItems(this.query.toArray()));
        this._initInput();
    }

    private _initInput(){
        this._input.down
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveForward());
        this._input.up
            .throttle(ev => Observable.interval(150)).forEach(ev => this.moveBack());

        this.movedForward.forEach(() => this._offset -= this.items[this.selectedIndex].height)
        this.movedBack.forEach(() => this._offset += this.items[this.selectedIndex+1].height);
    }
}