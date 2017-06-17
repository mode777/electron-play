import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { MaterialModule } from "../material/material.module";

import { ListComponent } from "./list.component";
import { ListItemComponent } from "./list-item.component";


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule
    ],
    exports: [
        ListComponent,
        ListItemComponent
    ],
    declarations: [
        ListComponent,
        ListItemComponent
    ],
    providers: [],
})
export class ListModule { }
