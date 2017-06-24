import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'tv-slider-heading',
    template: `
        <div class="slider-heading" [style.color]="color">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .slider-heading {
            padding: 20px;
            padding-left: 32px;
            font-family: 'Roboto', sans-serif;
            font-size: 12px;
            font-weight: 700;
        }
    `] 
})

export class TvSliderHeadingComponent {
    @Input() color = "#609491";

    constructor() { }
}