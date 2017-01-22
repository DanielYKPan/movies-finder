/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { IMovieDetails, ICast, IVideo, IMovie, IReview } from "../../model";
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
            ( data: {res: IMovieDetails} ) => {
                this.movie = data.res;
                this.cast = this.movie.credits.cast.filter(( item ) => item.profile_path).slice(0, 4);
                if (this.movie.videos.results && this.movie.videos.results.length > 0) {
                    this.video = this.movie.videos.results[0];
                    this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                }
                this.similarMovies = this.movie.similar.results;
                this.movieReviews = this.movie.reviews.results;
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
