import { NgModule } from '@angular/core';
import { DbModule } from "../db";

export * from "./retro-play.connection";
export * from "./retro-play.initializer";
export * from "./platform.model";
export * from "./platform.source";

@NgModule({
    imports: [DbModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class RetroPlayDbModule { }
