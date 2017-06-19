import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { TvInputService } from "../tv";
import { TvInputComponent } from "./tv-input.component";
import { TvRowComponent } from "./tv-row.component";
import { TvRowItemComponent } from "./tv-row-item.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent
    ],
    declarations: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent
    ],
    providers: [
        TvInputService
    ],
})
export class TvComponentsModule { }
