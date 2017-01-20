/**
 * header.component
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: [
        './header.component.scss'
    ],
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

    naviActive: boolean;

    constructor() {
    }

    ngOnInit() {
        this.naviActive = false;
    }

    toggleNavi(): void {
        this.naviActive = !this.naviActive;
    }
}
