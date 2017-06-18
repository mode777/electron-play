import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";

import { ModelItemComponent } from "./model-item.component";
import { ModelViewComponent } from "./model-view.component";
import { ModelEditComponent } from "./model-edit.component";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        ModelItemComponent,
        ModelViewComponent,
        ModelEditComponent
    ],
    declarations: [
        ModelItemComponent,
        ModelViewComponent,
        ModelEditComponent
    ],
    providers: [],
})
export class CommonComponentsModule { }
