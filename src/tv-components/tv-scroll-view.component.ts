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
            console.log(this.content, this.target, this.viewport)
            if(!this.target.nativeElement)
                return; 

            const target = <HTMLElement>this.target.nativeElement;

            const targetRect = target.getBoundingClientRect();
            const contentRect = (<HTMLElement>this.content.nativeElement).getBoundingClientRect();
            const viewportRect = (<HTMLElement>this.viewport.nativeElement).getBoundingClientRect();
            
            const spaceToScrollDown = Math.max(contentRect.bottom - viewportRect.bottom, 0);
            const spaceToScrollUp = Math.max(viewportRect.top - contentRect.top, 0);
            const distBottom = viewportRect.bottom - targetRect.bottom;
            const distTop = targetRect.top - viewportRect.top + this._scrollY; 

            console.log("top dist elem", distTop);
            console.log("viewport height ", viewportRect.height);
            console.log("space to scroll ", contentRect.bottom - viewportRect.bottom);
            console.log("target x", targetRect.top);

            if(distTop > viewportRect.width/2 && spaceToScrollDown > 0){
                this._scrollY = distTop - viewportRect.width/2, spaceToScrollDown;
            }
        });
    }
    
}