/**
 * series-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ISeriesDetails, IVideos, IVideo } from "../../model";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss']
})

export class SeriesDetailsComponent implements OnInit, OnDestroy {

    series: ISeriesDetails;
    video: IVideo;
    private getSeriesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private sanitizer: DomSanitizer ) {
    }

    ngOnInit(): void {
        this.getSeriesSub = this.route.data.subscribe(
            ( data: {res: [ISeriesDetails, IVideos]} ) => {
                this.series = data.res[0];
                if(data.res[1].results && data.res[1].results.length > 0) {
                    this.video = data.res[1].results[0];
                    this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getSeriesSub)
            this.getSeriesSub.unsubscribe();
    }
}
