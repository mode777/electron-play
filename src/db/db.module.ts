import { NgModule } from '@angular/core';
import { CommonModule } from "../common";

export * from "./common";
export * from "./connections";
export * from "./model"
export * from "./db.initializer";

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class DbModule { }
