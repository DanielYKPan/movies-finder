/**
 * movies.component
 */

import { Component, OnInit } from "@angular/core";
import { MovieService } from "../movie.service";
import { Observable } from "rxjs";
import { PaginatedResult, IMovie } from "../model";

@Component({
    selector: 'app-movies-home',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

    popularList$: Observable<PaginatedResult<IMovie[]>>;

    constructor(private movieService: MovieService) {
    }

    ngOnInit(): void {
        this.popularList$ = this.movieService.getPopular();
    }
}
