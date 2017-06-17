import { Component, OnInit, Input } from '@angular/core';
import { DataSourceItem } from "../data/interfaces";

@Component({
    selector: 'rp-list-item',
    template: `
        <md-card>
            <ng-content></ng-content>
            <md-card-actions>
                <button md-button (click)="edit.emit()"><md-icon class="icon">edit</md-icon></button>
                <button md-button (click)="destroy.emit()"><md-icon class="icon">delete</md-icon></button>
            </md-card-actions>
        </md-card>
    `
})

export class ListItemComponent {
    @Input() item: DataSourceItem;

    destroy(){
        console.log("delete ", this.item);
    }

    edit() {
        
    }
}