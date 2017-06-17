import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as fs from 'fs';
import { PlatformModel, PlatformEntity } from "./platform.model";


@Component({
    selector: 'rp-platform-display',
    template: `
    <md-card>
        <md-card-title>
            <span>{{ model.name }}</span>
        </md-card-title>
        <md-card-subtitle>{{ model.description }}</md-card-subtitle>
        <md-card-actions>
            <button md-button (click)="edit.emit()"><md-icon class="icon">edit</md-icon></button>
            <button md-button (click)="destroy.emit()"><md-icon class="icon">delete</md-icon></button>
        </md-card-actions>
    </md-card>
    `,
})
export class PlatformDisplayComponent {

    @Input() 
    model: PlatformEntity;
    @Output() 
    edit = new EventEmitter<void>();
    @Output() 
    destroy = new EventEmitter<void>();

}