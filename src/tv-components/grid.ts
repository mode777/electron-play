import { GridItem } from "./grid-item";
import { Activatable } from "./interfaces";
import { EventEmitter, Input, Output } from "@angular/core";

export class Grid<T extends GridItem> implements Activatable {

    @Output() onActivate = new EventEmitter<void>();
    @Output() onDeactivate = new EventEmitter<void>();
    @Output() onMoveUp = new EventEmitter<void>();
    @Output() onMoveDown = new EventEmitter<void>();
    @Output() onMoveLeft = new EventEmitter<void>();
    @Output() onMoveRight = new EventEmitter<void>();
    @Output() onOverUp = new EventEmitter<void>();
    @Output() onOverDown = new EventEmitter<void>();
    @Output() onOverLeft = new EventEmitter<void>();
    @Output() onOverRight = new EventEmitter<void>();
    @Output() onItemsChanged = new EventEmitter<void>();
    @Output() onFocusChanged = new EventEmitter<void>();

    private _active = false;
    private _coords: number[] = null;
    private _focusedItem: T = null;
    private _items: T[] = [];
    
    constructor(private _flow: "row" | "column" = "row", private _wrap = 4){
    }
    
    activate() {
        if(!this._active){            
            this._active = true;
            this._activateItems();
            this.onActivate.emit();
        }
    }
    deactivate() {
        if(this._active){
            this._active = false;
            this._deactivateItems();
            this.onDeactivate.emit();
        }
    }
    setItems(items: T[]){
        this._items = items;
        if(this.isActive)
            this._activateItems();
        else
            this._deactivateItems();

        if(this.focusedItem && this._items.indexOf(this.focusedItem)){
            this._coords = this._getItemCoordinates(this._focusedItem);
        }
        else{
            this.focusItem(this._items[0]);
        }

        this.onItemsChanged.emit();
    }
    moveLeft(){
        if(!this.isActive)
            return;

        if(this._moveTo(this.indexX-1, this.indexY))
            this.onMoveLeft.emit();
        else
            this.onOverLeft.emit();
    }
    moveRight(){
        if(!this.isActive)
            return;

        if(this._moveTo(this.indexX+1, this.indexY))
            this.onMoveRight.emit();
        else
            this.onOverRight.emit();

    }
    moveUp(){
        if(!this.isActive)
            return;

        if(this._moveTo(this.indexX, this.indexY-1))
            this.onMoveUp.emit();
        else
            this.onOverUp.emit();

    }
    moveDown(){
        if(!this.isActive)
            return;

        if(this._moveTo(this.indexX, this.indexY+1))
            this.onMoveDown.emit();
        else
            this.onOverDown.emit();
    }
    focusItem(item?: T){
        if(!this.isActive)
            return;

        if(!item && this._focusedItem){
            this._focusedItem.unfocus();
            this._focusedItem = null;
            this.onFocusChanged.emit();
        }

        if(!item.hasFocus || item !== this._focusedItem){
            if(this._focusedItem) 
                this._focusedItem.unfocus();
            
            item.focus();
            this._focusedItem = item;
            this._coords = this._getItemCoordinates(item);
            this.onFocusChanged.emit();
        }
    }
    resetFocus(){
        this.focusItem(this._items[0]);
    }
    private _getArrayIndex(x: number, y: number){
        switch (this._flow) {
            case "row": return (y * this._wrap) + x;
            case "column": return (x * this._wrap) + y;
            default: throw new Error("Invalid flow type");
        }
    }
    private _getItemCoordinates(item: T){
        const index = this._items.indexOf(item);
        if(index === -1)
            return null;

        switch (this._flow) {
            case "row": return [ index % this._wrap, Math.floor(index / this._wrap) ];
            case "column": return [ Math.floor(index / this._wrap), index % this._wrap ];
            default: throw new Error("Invalid flow type");
        }
    }

    private _activateItems(){
        this._items.forEach(item => item.activate());
    }
    private _deactivateItems(){
        this._items.forEach(item => item.deactivate());
    }
    private _moveTo(x: number, y: number){
        if(x >= this.rows || x < 0 || y >= this.columns || y < 0)
            return false;
        
        const index = this._getArrayIndex(x,y);
        
        if(index >= this._items.length)
            return false;

        this.focusItem(this._items[index]);
        return true;
    }
    
    get rows(){ 
        return this._flow === "row" 
            ? Math.ceil(this._items.length / this._wrap)
            : this._wrap; 
    }
    get columns(){
        return this._flow === "column" 
            ? this._wrap
            : Math.ceil(this._items.length / this._wrap);
    }
    get isActive() { return this._active; }
    get indexX() { return this._coords ? this._coords[0] : null; }
    get indexY() { return this._coords ? this._coords[1] : null; }
    get focusedItem() { return this._focusedItem; }

}