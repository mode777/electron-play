import { Component, OnInit, ElementRef, ViewChild, Input, AfterContentInit, Renderer } from '@angular/core';

@Component({
    selector: 'tv-scroll-view',
    template: `
        <div #wrapper class="wrapper">
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
            top: 0;
            overflow: hidden;
        }
        .content {
            transition: margin 130ms ease-out;
        }
    `]
})
export class TvScrollViewComponent implements AfterContentInit {

    @Input() target: ElementRef;
    @ViewChild('content') content: ElementRef; 
    @ViewChild('wrapper') viewport: ElementRef; 

    private _scrollX = 0;
    private _scrollY = 0;

    constructor() { }

    ngAfterContentInit(): void {
        this.update();
    }

    update(){
        setTimeout(() => {            
            if(!this.target.nativeElement)
                return; 

            const target = <HTMLElement>this.target.nativeElement;

            const targetRect = target.getBoundingClientRect();
            const contentRect = (<HTMLElement>this.content.nativeElement).getBoundingClientRect();
            const viewportRect = (<HTMLElement>this.viewport.nativeElement).getBoundingClientRect();
            
            const baseline = viewportRect.height * 0.61 + viewportRect.top;
            const remainBottom = Math.max(contentRect.bottom - viewportRect.bottom, 0);
            
            if(remainBottom > 0 && targetRect.bottom > baseline){
                const scroll = targetRect.bottom - baseline;
                this._scrollY += Math.min(remainBottom, scroll);
            }
            else if(this._scrollY > 0 && targetRect.top < baseline){
                const scroll = baseline - targetRect.top;
                this._scrollY -= Math.min(this._scrollY, scroll);
            }
        });
    }
    
}