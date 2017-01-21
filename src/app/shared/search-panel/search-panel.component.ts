/**
 * search-panel.component
 */

import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss']
})

export class SearchPanelComponent implements OnInit, OnDestroy {

    @Output() onSearchTermChange = new EventEmitter<any>();
    private searchTermStream = new Subject<string>();
    private searchTermSub: Subscription;

    constructor() {
    }

    ngOnInit(): void {
        this.searchTermSub = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(term => this.onSearchTermChange.emit(term))
    }

    ngOnDestroy(): void {
        if(this.searchTermSub)
            this.searchTermSub.unsubscribe();
    }

    search( term: string ) {
        this.searchTermStream.next(term);
    }
}
