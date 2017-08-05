import { NgModule } from '@angular/core';
import { DbModule } from "../db";
import { RetroPlayConnection } from "./retro-play.connection";
import { RetroPlayInitializer } from "./retro-play.initializer";

export * from "./retro-play.uow";
export * from "./retro-play.connection";
export * from "./retro-play.initializer";
export * from "./platform.model";
export * from "./platform.source";

@NgModule({
    imports: [DbModule],
    exports: [],
    declarations: [],
    providers: [
        RetroPlayInitializer,
        RetroPlayConnection,
    ],
})

export class RetroPlayDbModule { }
