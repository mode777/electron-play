import { NgModule } from '@angular/core';
import { CommonModule } from "../common";

export * from "./common";
export * from "./connections";

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class DbModule { }
