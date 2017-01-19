/**
 * movies.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { MovieService } from "../movie.service";
import { Observable, Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../../model";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'app-movies-home',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

    popularList: PaginatedResult<IMovie[]>;
    topRatedList: PaginatedResult<IMovie[]>;

    private getMoviesSub: Subscription;

    constructor( private movieService: MovieService ) {
    }

    ngOnInit(): void {
        let popularList$ = this.movieService.getPopular();
        let topRatedList$ = this.movieService.getTopRatedMovies();

        Observable.forkJoin([popularList$, topRatedList$]).subscribe(
            results => {
                this.popularList = results[0];
                this.topRatedList = results[1];
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();
    }
}
