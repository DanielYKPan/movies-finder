/**
 * season-details.component
 */

import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { IVideo, ISeriesSeasonDetails } from "../../model";

@Component({
    selector: 'app-series-season',
    templateUrl: './season-details.component.html',
    styleUrls: ['./season-details.component.scss']
})

export class SeasonDetailsComponent implements OnInit, OnDestroy {

    @Input() season: ISeriesSeasonDetails;
    @Input() video: IVideo;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}
