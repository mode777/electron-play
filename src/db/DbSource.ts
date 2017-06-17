import { SourceItem, Source, SourceChangeEvent } from "../data/interfaces";
import { Observable } from "rxjs/Observable";
import { EventEmitter } from "@angular/core";

export abstract class DbSource<TItem extends SourceItem> implements Source<TItem> {
    
    private readonly _items: Observable<TItem[]>;
    private readonly _changed = new EventEmitter<SourceChangeEvent<TItem>>();
    private _dataItems: TItem[];
    
    constructor(){
        this._items = this.changed.asObservable().map(async x => {
            switch (x.type) {
                case "sync":
                    this._dataItems = await this.loadAsync();
                    break;
                case "delete":
                    x.items.forEach(x => this.remove(x));
                    break;
                case "update":
                case "add":
                default:
                    break;
            }
            return this._dataItems;
        }).switchMap(x => x);
        this.changed.emit({
            type: "sync",
            items: []
        })
    }

    get items() { return this._items; }
    get changed() { return this._changed; }
    
    public add(item: TItem){
        const newItem = this.create();
        this._dataItems.push(newItem);
        this._changed.emit({
            type: "add",
            items: [newItem]
        });
    }

    protected abstract loadAsync() : Promise<TItem[]>;
    protected abstract create(): TItem;

    protected remove(item: TItem){

    }

}