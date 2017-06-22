import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { TvInputService } from "../tv";
import { TvInputComponent } from "./tv-input.component";
import { TvRowComponent } from "./tv-row.component";
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvLaneComponent } from "./tv-lane.component";
import { TvScreenService } from "./tv-screen.service";
import { TvScreenComponent } from "./tv-screen.component";
import { TvPanelComponent } from "./tv-panel.component";

export * from "./tv-screen.service";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent,
        TvLaneComponent,
        TvScreenComponent,
        TvPanelComponent
    ],
    declarations: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent,
        TvLaneComponent,
        TvScreenComponent,
        TvPanelComponent
    ],
    providers: [
        TvInputService,
        TvScreenService
    ],
})
export class TvComponentsModule { }
