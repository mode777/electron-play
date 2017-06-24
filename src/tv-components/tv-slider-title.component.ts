import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'tv-slider-title',
    template: `
        <div class="slider-title" [style.color]="color">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .slider-title {
            height: 64px;
            width: 100%;
            display: flex;
            align-items: flex-end;
            background-color: #37474f;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
            padding: 32px;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 25px;
        }
    `]    
})

export class TvSliderTitleComponent implements OnInit {
    @Input() color = "white";

    constructor() { }

    ngOnInit() { }
}