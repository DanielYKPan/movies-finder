/**
 * home.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { MovieService } from "../+movie/movie.service";
import { IMovie, IVideo } from "../model";
import { Subscription, Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MovieService],
})
export class HomeComponent implements OnInit, OnDestroy {

    moviesUpComing: Array<IMovie>;
    moviesNowPlaying: Array<IMovie>;
    featuredVideo: IVideo;
    featuredMovie: IMovie;
    private getMoviesSub: Subscription;

    constructor( private sanitizer: DomSanitizer,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {

        let moviesUpComing$ = this.movieService.getUpComingMovies();
        let moviesNowPlaying$ = this.movieService.getNowPlayingMovies();
        let featuredVideo$ = moviesNowPlaying$
            .map(res => res.result[0].id)
            .mergeMap(id => this.movieService.getMovieVideos(id.toString()));

        this.getMoviesSub = Observable.forkJoin([moviesUpComing$, moviesNowPlaying$, featuredVideo$])
            .subscribe(
                res => {
                    this.moviesUpComing = res[0].result;
                    this.moviesNowPlaying = res[1].result;
                    this.featuredMovie = this.moviesNowPlaying.shift();
                    if (res[2].results) {
                        this.featuredVideo = res[2].results[0];
                        this.featuredVideo.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.featuredVideo.key)
                    }
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();
    }
}
