import { Component, OnInit, HostListener } from '@angular/core';
import { TvInputService } from "../tv";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'tv-input',
    template: ''
})
export class TvInputComponent {
    constructor(private _service: TvInputService) { }

    @HostListener('window:keydown', ['$event'])
    private _keyDown($event) {
        switch ($event.keyCode) {
            case 37: return this._service.left.emit();
            case 38: return this._service.up.emit();
            case 39: return this._service.right.emit();
            case 40: return this._service.down.emit();
            case 13: return this._service.select.emit();
            case 27: return this._service.cancel.emit();
        }
    }
}