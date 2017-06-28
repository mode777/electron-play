import { Component, OnInit, Input } from '@angular/core';
import { menuStyle as _style } from "./style";

@Component({
    selector: 'tv-menu-heading',
    template: `
        <div class="slider-heading" [style.color]="color">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .slider-heading {
            padding: ${_style.heading.padding};
            padding-left: ${_style.paddingLeft};
            font-family: ${_style.heading.fontFamily};
            font-size: ${_style.heading.fontSize};
            font-weight: ${_style.heading.fontWeight};
            opacity: .6;
        }
    `] 
})

export class TvMenuHeadingComponent {
    @Input() color = _style.heading.colorDefault;

    constructor() { }
}