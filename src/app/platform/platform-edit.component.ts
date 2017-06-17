import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as fs from 'fs';
import { PlatformModel, PlatformEntity } from "./platform.model";

@Component({
    selector: 'rp-platform-edit',
    template: `
    <md-card>
        <md-card-title>{{ model.name }}</md-card-title>
        <md-card-subtitle>
            <md-input-container color="accent">
                <input mdInput placeholder="Description" [(value)]="model.description" >
            </md-input-container>
        </md-card-subtitle>
        <md-card-actions>
            <button md-button (click)="save()"><md-icon class="icon">save</md-icon></button>
            <button md-button (click)="cancel()"><md-icon class="icon">cancel</md-icon></button>
        </md-card-actions>
    </md-card>
    `
})
export class PlatformEditComponent {

    @Input() 
    model: PlatformEntity;
    @Output() 
    finish = new EventEmitter<void>();

    save(){
        //model.save();
        this.finish.emit();
    }

    cancel(){
        this.finish.emit();
    }

}