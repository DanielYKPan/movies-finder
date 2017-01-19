/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MovieService } from "../movie.service";
import { Subscription, Observable } from "rxjs";
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
                 private sanitizer: DomSanitizer,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                //window.scrollTo(0, 0);
                document.body.scrollTop = 0;
            });

        this.getMovieSub = this.route.params
            .switchMap(( params: Params ) => {
                let movie_id = params['id'];
                let movie$ = this.movieService.getMovie(movie_id);
                let movie_credits$ = this.movieService.getMovieCredits(movie_id);
                let movie_videos$ = this.movieService.getMovieVideos(movie_id);
                let movie_similar$ = this.movieService.getSimilarMovies(movie_id);
                let movie_reviews$ = this.movieService.getMovieReviews(movie_id);
                return Observable.forkJoin([movie$, movie_credits$, movie_videos$, movie_similar$, movie_reviews$]);
            })
            .subscribe(
                res => {
                    this.movie = res[0];
                    this.cast = res[1].cast.filter(( item ) => item.profile_path).slice(0, 4);
                    if (res[2].results) {
                        this.video = res[2].results[0];
                        this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                    }
                    this.similarMovies = res[3].result;
                    this.movieReviews = res[4].result;
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
