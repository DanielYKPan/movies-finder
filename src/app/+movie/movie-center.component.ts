/**
 * movie-center.component
 */

import { Component, OnInit } from '@angular/core';
import { MovieService } from "./movie.service";
import { Observable } from "rxjs";
import { IGenre } from "../model";

@Component({
    selector: 'app-movie',
    styleUrls: ['./movie-center.component.scss'],
    templateUrl: 'movie-center.component.html'
})
export class MovieCenterComponent implements OnInit {

    genres$: Observable<IGenre[]>;

    constructor( private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.genres$ = this.movieService.getGenres();
    }
}
