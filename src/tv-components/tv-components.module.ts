import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TvInputService } from "../tv";
import { TvScreenService } from "./tv-screen.service";

import { TvInputComponent } from "./tv-input.component";
import { TvRowComponent } from "./tv-row.component";
import { TvRowItemComponent } from "./tv-row-item.component";
import { TvLaneComponent } from "./tv-lane.component";
import { TvScreenComponent } from "./tv-screen.component";
import { TvSliderComponent } from "./tv-slider.component";
import { TvSliderTitleComponent } from "./tv-slider-title.component";
import { TvMenuHeadingComponent } from "./tv-menu-heading.component";
import { TvMenuComponent } from "./tv-menu.component";
import { TvMenuItemComponent } from "./tv-menu-item.component";
import { TvScrollViewComponent } from "./tv-scroll-view.component";
import { TvMenuSwitchComponent } from "./tv-menu-switch.component";
import { TvSwitchComponent } from "./tv-switch-component";

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        TvInputComponent,
        // TvRowComponent,
        // TvRowItemComponent,
        // TvLaneComponent,
        TvScreenComponent,
        // TvSliderComponent,
        // TvSliderTitleComponent,
        // TvMenuHeadingComponent,
        // TvMenuComponent,
        // TvMenuItemComponent,
        // TvScrollViewComponent,
        // TvMenuSwitchComponent,
        // TvSwitchComponent
    ],
    declarations: [
        TvInputComponent,
        // TvRowComponent,
        // TvRowItemComponent,
        // TvLaneComponent,
        TvScreenComponent,
        // TvSliderComponent,
        // TvSliderTitleComponent,
        // TvMenuHeadingComponent,
        // TvMenuComponent,
        // TvMenuItemComponent,
        // TvScrollViewComponent,
        // TvMenuSwitchComponent,
        // TvSwitchComponent
    ],
    providers: [
        TvInputService,
        TvScreenService,
    ],
})
export class TvComponentsModule { }

export * from "./tv-input.component";
export * from "./tv-row.component";
export * from "./tv-row-item.component";
export * from "./tv-lane.component";
export * from "./tv-screen.component";
export * from "./tv-slider.component";
export * from "./tv-slider-title.component";
export * from "./tv-menu-heading.component";
export * from "./tv-menu.component";
export * from "./tv-menu-item.component";
export * from "./tv-scroll-view.component";

export * from "./tv-screen.service";
