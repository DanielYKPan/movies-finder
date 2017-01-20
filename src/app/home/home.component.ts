/**
 * home.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { IMovie, IVideo, PaginatedResult, IMovieVideos } from "../model";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

    moviesUpComing: Array<IMovie>;
    moviesNowPlaying: Array<IMovie>;
    featuredVideo: IVideo;
    featuredMovie: IMovie;
    private getMoviesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private sanitizer: DomSanitizer ) {
    }

    ngOnInit(): void {
        this.getMoviesSub = this.route.data.subscribe(
            (data : {res: [PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>, IMovieVideos]}) => {
                this.moviesUpComing = data.res[0].result;
                this.moviesNowPlaying = data.res[1].result;
                this.featuredMovie = this.moviesNowPlaying.shift();
                if (data.res[2].results) {
                    this.featuredVideo = data.res[2].results[0];
                    this.featuredVideo.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.featuredVideo.key)
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();
    }
}
