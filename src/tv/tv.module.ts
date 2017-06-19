import { NgModule } from '@angular/core';
import {TvInputService} from "./tv-input.service";

export * from "./input.service";
export * from "./navigation.component";
export * from "./tv-input.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [TvInputService],
})
export class TvModule { }
