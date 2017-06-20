import { EventEmitter } from "@angular/core";

export abstract class NavigationComponent {

    public select = new EventEmitter<void>();

    selected: boolean;

    abstract focus();
    abstract unfocus();
}