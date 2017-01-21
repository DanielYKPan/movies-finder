/**
 * series-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
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
    private routerEventsSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private sanitizer: DomSanitizer ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                document.body.scrollTop = 0;
            });

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
