/**
 * series-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ISeriesDetails, IVideo, ISeriesSeasonDetails } from "../../model";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { TVService } from "../tv.service";

@Component({
    selector: 'app-series-details',
    templateUrl: './series-details.component.html',
    styleUrls: ['./series-details.component.scss']
})

export class SeriesDetailsComponent implements OnInit, OnDestroy {

    series: ISeriesDetails;
    video: IVideo;
    season: ISeriesSeasonDetails;
    seasonVideo: IVideo;
    seasonDetailsModalOpen: boolean = false;
    private getSeriesSub: Subscription;
    private getSeasonSub: Subscription;
    private routerEventsSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private sanitizer: DomSanitizer,
                 private tvs: TVService ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                document.body.scrollTop = 0;
            });

        this.getSeriesSub = this.route.data.subscribe(
            ( data: {res: ISeriesDetails} ) => {
                this.series = data.res;
                if (this.series.videos.results && this.series.videos.results.length > 0) {
                    this.video = this.series.videos.results[0];
                    this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.routerEventsSub)
            this.routerEventsSub.unsubscribe();

        if (this.getSeriesSub)
            this.getSeriesSub.unsubscribe();

        if (this.getSeasonSub)
            this.getSeasonSub.unsubscribe();
    }

    toggleModal( status: boolean ) {
        this.seasonDetailsModalOpen = status;
    }

    showSeasonDetails( season_num: number ): void {
        this.getSeasonSub = this.tvs.getSeriesSeasonDetails(this.series.id, season_num).subscribe(
            data => {
                this.season = data;
                if (this.season.videos.results && this.season.videos.results.length > 0) {
                    this.seasonVideo = this.season.videos.results[0];
                    this.seasonVideo.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.seasonVideo.key)
                }
                this.seasonDetailsModalOpen = true
            }
        );
    }
}
