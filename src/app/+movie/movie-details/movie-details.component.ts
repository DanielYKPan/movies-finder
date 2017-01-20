/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { IMovieDetails, ICast, IVideo, IMovie, IReview, ICredits, IMovieVideos, PaginatedResult } from "../../model";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit, OnDestroy {

    movie: IMovieDetails;
    cast: Array<ICast>;
    video: IVideo;
    similarMovies: Array<IMovie>;
    movieReviews: Array<IReview>;
    private getMovieSub: Subscription;
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

        this.getMovieSub = this.route.data.subscribe(
            ( data: {res: [IMovieDetails, ICredits, IMovieVideos, PaginatedResult<IMovie[]>, PaginatedResult<IReview[]>]} ) => {
                this.movie = data.res[0];
                this.cast = data.res[1].cast.filter(( item ) => item.profile_path).slice(0, 4);
                if (data.res[2].results && data.res[2].results.length > 0) {
                    this.video = data.res[2].results[0];
                    this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                }
                this.similarMovies = data.res[3].result;
                this.movieReviews = data.res[4].result;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getMovieSub)
            this.getMovieSub.unsubscribe();

        if (this.routerEventsSub)
            this.routerEventsSub.unsubscribe();
    }
}
