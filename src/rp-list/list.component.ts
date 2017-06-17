import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rp-list',
    template: `
        <ng-content></ng-content>
    `
})

export class ListComponent {
    @Input() items: any[];
}