import { EventEmitter } from "@angular/core";

export interface InputService {
    up: EventEmitter<void>;
    down: EventEmitter<void>;
    left: EventEmitter<void>;
    right: EventEmitter<void>;
    select: EventEmitter<void>;
    cancel: EventEmitter<void>;
}