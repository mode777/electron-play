import { Component, Input } from '@angular/core';
import * as fs from 'fs';
import { PlatformModel, Platform } from "./platform.model";

@Component({
    selector: 'platform',
    templateUrl: '../static/templates/platform.component.html',
    styleUrls: ['../static/style/platform.component.css']
})
export class PlatformComponent {

    @Input() 
    model: Platform;

    constructor(){
        
    }

}