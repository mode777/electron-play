import { EventEmitter, HostListener } from "@angular/core";
import { InputService } from "./input.service";

export class TvInputService implements InputService {

    readonly up = new EventEmitter<void>();
    readonly down = new EventEmitter<void>();
    readonly left = new EventEmitter<void>();
    readonly right = new EventEmitter<void>();
    readonly select = new EventEmitter<void>();
    readonly cancel = new EventEmitter<void>();

}