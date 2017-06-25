import { Component, OnInit, ElementRef, ViewChild, Input, AfterContentInit } from '@angular/core';

@Component({
    selector: 'tv-scroll-view',
    template: `
        <div class="wrapper">
            <div #content class="content" [style.margin-left]="-_scrollX + 'px'" 
                [style.margin-top]="-_scrollY + 'px'" >
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            right:0;
            top: 120px;
            overflow: hidden;
        }
        .content {
            transition: margin 130ms ease-out;
        }
    `]
})
export class TvScrollViewComponent implements AfterContentInit {

    @Input() target: ElementRef;
    @ViewChild('content') input: ElementRef; 

    private _scrollX = 0;
    private _scrollY = 0;

    constructor() { }

    ngAfterContentInit(): void {
        this.update();
    }

    update(){
        // TODO: Native stuff
    }
    
}