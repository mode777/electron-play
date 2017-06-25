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
import { TvSliderComponent } from "./tv-slider.component";
import { TvSliderTitleComponent } from "./tv-slider-title.component";
import { TvSliderHeadingComponent } from "./tv-slider-heading.component";
import { TvSliderMenuComponent } from "./tv-slider-menu.component";
import { TvSliderItemComponent } from "./tv-slider-item.component";
import { TvScrollViewComponent } from "./tv-scroll-view.component";

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
        TvSliderComponent,
        TvSliderTitleComponent,
        TvSliderHeadingComponent,
        TvSliderMenuComponent,
        TvSliderItemComponent,
        TvScrollViewComponent
    ],
    declarations: [
        TvInputComponent,
        TvRowComponent,
        TvRowItemComponent,
        TvLaneComponent,
        TvScreenComponent,
        TvSliderComponent,
        TvSliderTitleComponent,
        TvSliderHeadingComponent,
        TvSliderMenuComponent,
        TvSliderItemComponent,
        TvScrollViewComponent
    ],
    providers: [
        TvInputService,
        TvScreenService,
    ],
})
export class TvComponentsModule { }
