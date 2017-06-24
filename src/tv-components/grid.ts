import { GridItem } from "./grid-item";
import { Activatable } from "./interfaces";
import { EventEmitter, Input } from "@angular/core";

export class Grid<T extends GridItem> implements Activatable {

    onActivate = new EventEmitter<void>();
    onDeactivate = new EventEmitter<void>();
    onMoveUp = new EventEmitter<void>();
    onMoveDown = new EventEmitter<void>();
    onMoveLeft = new EventEmitter<void>();
    onMoveRight = new EventEmitter<void>();
    onOverUp = new EventEmitter<void>();
    onOverDown = new EventEmitter<void>();
    onOverLeft = new EventEmitter<void>();
    onOverRight = new EventEmitter<void>();
    onItemsChanged = new EventEmitter<void>();

    private _active = false;
    private _indexX = 0;
    private _indexY = 0;
    private _selected: T = null;
    
    constructor(private _direction: "row" | "column" = "column", private _wrap = 1){
    }
    
    activate() {
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    setItems(items: T[]){

    }
    moveLeft(){

    }
    moveRight(){

    }
    moveUp(){

    }
    moveDown(){

    }
    focusItem(item: T){
        item.focus();
    }
    
    get isActive() { return this._active; }
    get indexX() { return this._indexX; }
    get indexY() { return this._indexY; }
}