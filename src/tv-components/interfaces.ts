import { EventEmitter } from "@angular/core";

export interface Selectable {
    select();
    onSelect: EventEmitter<void>;
}

export interface Activatable {
    activate();
    deactivate();
    isActive: boolean;
    onActivate: EventEmitter<void>;
    onDeactivate: EventEmitter<void>;
}

export interface Focusable {
    focus();
    unfocus();
    hasFocus: boolean;
    onFocus: EventEmitter<void>;
    onUnfocus: EventEmitter<void>;
}