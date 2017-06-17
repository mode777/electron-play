import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PlatformComponent } from "./platform/platform.component";
import { TitleComponent } from "./header/header.component";
import { PlatformDisplayComponent } from "./platform/platform-display.component";
import { PlatformEditComponent } from "./platform/platform-edit.component";
import { PlatformListComponent } from "./platform/platform-list.component";

@NgModule({
  declarations: [
    AppComponent,
    PlatformComponent,
    PlatformDisplayComponent,
    PlatformEditComponent,
    PlatformListComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
