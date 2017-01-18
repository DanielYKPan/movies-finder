/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { MovieService } from "../movie.service";
import { Subscription, Observable } from "rxjs";
import { IMovieDetails, ICast } from "../model";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit, OnDestroy {

    movie: IMovieDetails;
    cast: Array<ICast>;
    private getMovieSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getMovieSub = this.route.params
            .switchMap(( params: Params ) => {
                let movie_id = params['id'];
                let movie$ = this.movieService.getMovie(movie_id);
                let movie_credits$ = this.movieService.getMovieCredits(movie_id);
                return Observable.forkJoin([movie$, movie_credits$]);
            })
            .subscribe(
                results => {
                    this.movie = results[0];
                    this.cast = results[1].cast.filter(( item ) => item.profile_path).slice(0, 4);
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getMovieSub)
            this.getMovieSub.unsubscribe();
    }
}
