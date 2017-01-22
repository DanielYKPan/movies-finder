/**
 * modal.component
 */

import {
    Component, Output, OnInit, EventEmitter, Inject, OnDestroy
} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {

    private body: any;
    @Output() onOverlayClick = new EventEmitter<boolean>();

    constructor( @Inject(DOCUMENT) private document ) {
    }

    ngOnInit() {

        //https://github.com/angular/angular/issues/8509
        this.body = this.document.getElementsByTagName('body')[0];
        this.body.style.overflow = "hidden";
    }

    ngOnDestroy(): void {
        this.body.removeAttribute("style");
    }

    closeModal() {
        this.onOverlayClick.emit(false);
    }
}
