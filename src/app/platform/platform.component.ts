import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as fs from 'fs';
import { PlatformModel, PlatformEntity } from "./platform.model";

@Component({
    selector: 'rp-platform',
    template: `
    <rp-platform-edit *ngIf="edit; else elseBlock" [model]="model" (finish)="edit = !edit"></rp-platform-edit>
    <ng-template #elseBlock>
        <rp-platform-display [model]="model" (edit)="edit = !edit" (destroy)="destroy.emit()"></rp-platform-display>
    </ng-template>
    `,
    styles: [`
    rp-platform-display, rp-platform-edit {
        margin: 15px;
    }
    `]
})
export class PlatformComponent {

    @Input() edit: boolean = false;
    @Input() model: PlatformEntity;   
    @Output() destroy = new EventEmitter<void>();


}