/**
 * series-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TVService } from "../tv.service";
import { ISeriesDetails } from "../../model";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss']
})

export class SeriesDetailsComponent implements OnInit, OnDestroy {

    series: ISeriesDetails;
    private getSeriesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private tvService: TVService ) {
    }

    ngOnInit(): void {
        this.getSeriesSub = this.route.data.subscribe(
            (data: {res: ISeriesDetails}) => {
                this.series = data.res;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getSeriesSub)
            this.getSeriesSub.unsubscribe();
    }
}
