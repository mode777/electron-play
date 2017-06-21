import { EventEmitter } from "@angular/core";

export class TvScreenService {
    imageChanged = new EventEmitter<string>();
    changeImage(src: string){
        this.imageChanged.emit(src);
    } 
}