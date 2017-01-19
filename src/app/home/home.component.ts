/**
 * home.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { MovieService } from "../+movie/movie.service";
import { IMovie } from "../model";
import { Subscription, Observable } from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MovieService],
})
export class HomeComponent implements OnInit, OnDestroy {

    moviesUpComing: Array<IMovie>;
    moviesNowPlaying: Array<IMovie>;
    private getMoviesSub: Subscription;

    constructor( private movieService: MovieService ) {
    }

    ngOnInit(): void {

        let moviesUpComing$ = this.movieService.getUpComingMovies();
        let moviesNowPlaying$ = this.movieService.getNowPlayingMovies();

        this.getMoviesSub = Observable.forkJoin([moviesUpComing$, moviesNowPlaying$])
            .subscribe(
                res => {
                    this.moviesUpComing = res[0].result;
                    this.moviesNowPlaying = res[1].result;
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();
    }
}
