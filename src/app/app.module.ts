import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from "../material/material.module";
import { CommonComponentsModule } from "../common.components";
import { RetroPlayConnection, PlatformSource } from "../db.retro-play";

import { AppComponent } from './app.component';
import { PlatformComponent } from "./platform/platform.component";
import { TitleComponent } from "./header/header.component";
import { TvInputService } from "../tv";
import { TvComponentsModule } from "../tv-components";

@NgModule({
    declarations: [
        AppComponent,
        PlatformComponent,
        TitleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        CommonComponentsModule,
        TvComponentsModule
    ],
    providers: [
        RetroPlayConnection,
        PlatformSource,
        TvInputService
    ],
    bootstrap: [AppComponent]
    })
export class AppModule { }
