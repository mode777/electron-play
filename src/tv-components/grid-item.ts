import { Selectable, Activatable, Focusable } from "./interfaces";
import { EventEmitter, ElementRef } from "@angular/core";

export abstract class GridItem implements Selectable, Activatable, Focusable {
    
    onFocus = new EventEmitter<void>();
    onUnfocus = new EventEmitter<void>();
    onActivate = new EventEmitter<void>();
    onDeactivate = new EventEmitter<void>();
    onSelect = new EventEmitter<void>();

    private _hasFocus = false;
    private _isActive = false;
    
    focus() { 
        this._isActive = true;
        this._hasFocus = true; 
    }    
    
    unfocus() { this._hasFocus = false; }
    
    activate() { this._isActive = true; }
    
    deactivate() { 
        this._hasFocus = false;
        this._isActive = false; 
    }

    abstract select();
    
    get isActive() { return this._isActive; }
    get hasFocus() { return this._hasFocus; }
    abstract get element(): ElementRef;
}