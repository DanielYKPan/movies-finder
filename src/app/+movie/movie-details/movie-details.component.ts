/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MovieService } from "../movie.service";
import { Subscription, Observable } from "rxjs";
import { IMovieDetails, ICast, IVideo } from "../model";
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
    private getMovieSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private sanitizer: DomSanitizer,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getMovieSub = this.route.params
            .switchMap(( params: Params ) => {
                let movie_id = params['id'];
                let movie$ = this.movieService.getMovie(movie_id);
                let movie_credits$ = this.movieService.getMovieCredits(movie_id);
                let movie_videos$ = this.movieService.getMovieVideos(movie_id);
                return Observable.forkJoin([movie$, movie_credits$, movie_videos$]);
            })
            .subscribe(
                res => {
                    this.movie = res[0];
                    this.cast = res[1].cast.filter(( item ) => item.profile_path).slice(0, 4);
                    if(res[2].results) {
                        this.video = res[2].results[0];
                        this.video.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video.key)
                    }
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getMovieSub)
            this.getMovieSub.unsubscribe();
    }
}
