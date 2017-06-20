import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { TvInputService } from "../tv";
import { TvInputComponent } from "./tv-input.component";
import { TvRowComponent } from "./tv-row.component";
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvLaneComponent } from "./tv-lane.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent,
        TvLaneComponent
    ],
    declarations: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent,
        TvLaneComponent
    ],
    providers: [
        TvInputService
    ],
})
export class TvComponentsModule { }
