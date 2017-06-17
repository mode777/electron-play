import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `

    <rp-header title="{{title}}"></rp-header>
    <rp-platform-list></rp-platform-list>
    
    `, 
    styles: [`
    `]
})
export class AppComponent {
    title = "RetroPlay";
}
