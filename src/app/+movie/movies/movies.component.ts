/**
 * movies.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../../model";
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../movie.service";

@Component({
    selector: 'app-movies-home',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

    popularList: PaginatedResult<IMovie[]>;
    topRatedList: PaginatedResult<IMovie[]>;
    searchResult: PaginatedResult<IMovie[]>;

    private getMoviesSub: Subscription;
    private searchMoviesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
        this.getMoviesSub = this.route.data.subscribe(
            ( data: {res: [PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>]} ) => {
                this.popularList = data.res[0];
                this.topRatedList = data.res[1];
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();

        if (this.searchMoviesSub)
            this.searchMoviesSub.unsubscribe();
    }

    searchMovies( searchTerm: string ): void {
        if(!searchTerm) {
            this.searchResult = null;
            return;
        }

        this.searchMoviesSub = this.movieService.searchMovies(searchTerm).subscribe(
            data => {
                this.searchResult = data;
                console.log(data);
            }
        );
    }
}
