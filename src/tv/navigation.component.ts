import { EventEmitter } from "@angular/core";

export abstract class NavigationComponent {

    public select = new EventEmitter<void>();

    abstract focus();
    abstract unfocus();
}