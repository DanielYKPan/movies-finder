/**
 * genres.component
 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../model";
import { MovieService } from "../movie.service";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-movie-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss']
})

export class GenresComponent implements OnInit {

    title: string;
    movies: PaginatedResult<IMovie[]>;

    private getMoviesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getMoviesSub = this.route.params
            .switchMap(( params: Params ) => {
                this.title = params['name'];
                return this.movieService.getMoviesByGenre(params['id'])
            })
            .subscribe(( movies: PaginatedResult<IMovie[]> ) => this.movies = movies);
    }
}
