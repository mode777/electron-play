import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tv-v-list',
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
    
    `]
})

export class TvVListComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}