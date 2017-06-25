import { Selectable, Activatable, Focusable } from "./interfaces";
import { EventEmitter, ElementRef, Output } from "@angular/core";

export abstract class GridItem implements Activatable, Focusable {
    
    @Output() onFocus = new EventEmitter<void>();
    @Output() onUnfocus = new EventEmitter<void>();
    @Output() onActivate = new EventEmitter<void>();
    @Output() onDeactivate = new EventEmitter<void>();

    private _hasFocus = false;
    private _isActive = false;
    
    focus() { 
        if(!this.hasFocus){
            this.activate();
            this._hasFocus = true;
            this.onFocus.emit(); 
        }
    }    
    
    unfocus() { 
        if(this.hasFocus){
            this._hasFocus = false;
            this.onUnfocus.emit(); 
        }
    }
    
    activate() { 
        if(!this.isActive){
            this._isActive = true; 
            this.onActivate.emit();
        }
    }
    
    deactivate() { 
        if(this.isActive){
            this.unfocus();            
            this._isActive = false; 
            this.onDeactivate.emit();
        }
    }
    
    get isActive() { return this._isActive; }
    get hasFocus() { return this._hasFocus; }
    abstract get element(): ElementRef;
}