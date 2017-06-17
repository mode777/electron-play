
import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";

export interface SourceChangeEvent<TItem extends SourceItem> {
    items: TItem[],
    type: "add" | "update" | "delete" | "sync";
}

export interface SourceItem {
    save();
    delete();
}

export interface Source<TItem extends SourceItem> {
    add(item: TItem);
    items: Observable<TItem[]>;
    changed: EventEmitter<SourceChangeEvent<TItem>>;
}