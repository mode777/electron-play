import { Component, Input } from '@angular/core';
import * as fs from 'fs';
import { PlatformModel, Platform } from "./platform.model";

@Component({
    selector: 'rp-platform',
    template: `


    <ng-template #elseBlock>
        <rp-platform-display [model]="model" (edit)="edit = !edit"></rp-platform-display>
    </ng-template>
    <rp-platform-edit *ngIf="edit; else elseBlock" [model]="model" (finish)="edit = !edit"></rp-platform-edit>


    `,
    styles: [`

        rp-platform-display, rp-platform-edit {
            margin: 15px;
        }

    `]
})
export class PlatformComponent {

    @Input() 
    edit: boolean = false;
    @Input() 
    model: Platform;   

}