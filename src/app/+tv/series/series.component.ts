/**
 * series.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ISeries, PaginatedResult } from "../../model";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { TVService } from "../tv.service";

@Component({
    selector: 'app-series-list',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss']
})

export class SeriesComponent implements OnInit, OnDestroy {

    popularList: PaginatedResult<ISeries[]>;
    topRatedList: PaginatedResult<ISeries[]>;

    private getSeriesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private tvService: TVService ) {
    }

    ngOnInit(): void {
        this.getSeriesSub = this.route.data.subscribe(
            ( data: {res: [PaginatedResult<ISeries[]>, PaginatedResult<ISeries[]>]} ) => {
                this.popularList = data.res[0];
                this.topRatedList = data.res[1];
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getSeriesSub)
            this.getSeriesSub.unsubscribe();
    }
}
