/**
 * movie-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { MovieService } from "../movie.service";
import { Subscription } from "rxjs";
import { IMovieDetails } from "../model";

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit, OnDestroy {

    movie: IMovieDetails;
    private getMovieSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getMovieSub = this.route.params
            .switchMap(( params: Params ) => {
                return this.movieService.getMovie(params['id'])
            })
            .subscribe(( movie: IMovieDetails ) => this.movie = movie);
    }

    ngOnDestroy(): void {
        if (this.getMovieSub)
            this.getMovieSub.unsubscribe();
    }
}
