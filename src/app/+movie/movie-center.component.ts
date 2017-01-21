/**
 * movie-center.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from "./movie.service";
import { Observable, Subscription } from "rxjs";
import { IGenre } from "../model";

@Component({
    selector: 'app-movie',
    styleUrls: ['./movie-center.component.scss'],
    templateUrl: 'movie-center.component.html'
})
export class MovieCenterComponent implements OnInit, OnDestroy {

    genres: IGenre[];
    private getGenresSub: Subscription;

    constructor( private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getGenresSub = this.movieService.getGenres().subscribe(
            res => this.genres = res.genres
        );
    }

    ngOnDestroy(): void {
        if(this.getGenresSub)
            this.getGenresSub.unsubscribe();
    }

}
