/**
 * movies.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../../model";
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-movies-home',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

    popularList: PaginatedResult<IMovie[]>;
    topRatedList: PaginatedResult<IMovie[]>;

    private getMoviesSub: Subscription;

    constructor( private route: ActivatedRoute ) {
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
    }
}
