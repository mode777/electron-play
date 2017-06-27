import { Component, OnInit, Input, trigger, state, style, transition, animate, EventEmitter, Output, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { Selectable } from "./interfaces";
import { GridItem } from "./grid-item";
import { TvInputService } from "../tv";
import { Observable } from "rxjs";
import { TvMenuItemComponent } from "./tv-menu-item.component";

@Component({
    selector: 'tv-menu-toggle',
    template: `
        <tv-menu-item #inner [color]="color" [icon]="icon" [highlight]="highlight">
            <ng-content></ng-content> 
            <tv-switch class="switch" [checked]="checked"></tv-switch>
        </tv-menu-item>
    `,
    styles: [`
        .switch {
            position: absolute;
            right: 16px;
        }
    `],
    providers: [{provide: TvMenuItemComponent, useExisting: forwardRef(() => TvMenuToggleComponent)}]
})

export class TvMenuToggleComponent extends TvMenuItemComponent implements Selectable, OnInit {

    @Input() checked = false;

    @ViewChild("inner") inner: TvMenuItemComponent;
    
    constructor(element: ElementRef, input: TvInputService) {
        super(element, input);
    }

    focus(){
        super.focus();
        this.inner.focus();
    }

    unfocus(){
        super.unfocus();
        this.inner.unfocus();
    }

    activate(){
        super.activate();
        this.inner.activate();
    }

    deactivate(){
        super.deactivate();
        this.inner.deactivate();
    }

    ngOnInit(): void {
        this.onSelect.forEach(() => this.checked = !this.checked);
    }
}