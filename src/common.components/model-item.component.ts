import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Source, Model } from "../common";

@Component({
    selector: 'model-item',
    template: `
            <div *ngIf="!editMode; else elseBlock">
                <md-card>
                    <ng-content select="model-view" ></ng-content>
                    <md-card-actions>
                        <button md-button (click)="edit()"><md-icon class="icon">edit</md-icon></button>
                        <button md-button (click)="destroy()"><md-icon class="icon">delete</md-icon></button>
                    </md-card-actions>
                </md-card>
            </div>
            <ng-template #elseBlock>
                <md-card>
                    <ng-content select="model-edit" ></ng-content>
                    <md-card-actions>
                        <button md-button (click)="save()"><md-icon class="icon">save</md-icon></button>
                        <button md-button (click)="cancel()"><md-icon class="icon">cancel</md-icon></button>
                    </md-card-actions>
                </md-card>
            </ng-template>

    `
})
export class ModelItemComponent {
    @Input() source: Source<Model>;
    @Input() model: Model;
    @Input() editMode: boolean = false;

    constructor(){

    }

    destroy(){
        this.source.removeAsync(this.model);
    }

    edit() {
        this.editMode = true;
    }

    async save() {
        await this.model.saveAsync();
        this.editMode = false;
    }

    async cancelAsync() {
        await this.model.cancelAsync();
        this.editMode = false;
    }
}