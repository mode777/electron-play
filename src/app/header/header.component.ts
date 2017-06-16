import { Component, Input } from '@angular/core';

@Component({
    selector: 'rp-header',
    template: `

        <md-toolbar color="accent" class="header">
            <md-icon class="icon">videogame_asset</md-icon>
            <span>{{title}}</span>
             <span class="spacer"></span>
            <md-icon class="icon">settings</md-icon>
        </md-toolbar>

    `,
    styles: [ `

        .header {
            position: fixed;
            top: 0;
            z-index: 9999;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
        }
        .icon {
            padding: 0 14px;
        }

        .spacer {
            flex: 1 1 auto;
        }

    `]
})
export class TitleComponent {

    @Input() 
    title: string;

}