import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetroPlayConnection, PlatformSource, RetroPlayInitializer, RetroPlayUow } from "../db.retro-play";

import { AppComponent } from './app.component';
import { TvInputService } from "../tv";
import { TvComponentsModule, TvScreenComponent } from "../tv-components";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        TvComponentsModule
    ],
    providers: [
        RetroPlayInitializer,
        RetroPlayConnection,
        //RetroPlayUow,
        TvInputService,
        TvScreenComponent
    ],
    bootstrap: [AppComponent]
    })
export class AppModule { }
