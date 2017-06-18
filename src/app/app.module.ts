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
        CommonComponentsModule
    ],
    providers: [
        RetroPlayConnection,
        PlatformSource
    ],
    bootstrap: [AppComponent]
    })
export class AppModule { }
