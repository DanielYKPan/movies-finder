/**
 * home-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IMovie, PaginatedResult, IVideos } from "../model";
import { Observable } from "rxjs";
import { MovieService } from "../+movie/movie.service";

@Injectable()
export class HomeDataResolver implements Resolve<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>, IVideos]> {


    constructor( private ms: MovieService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>, IVideos]>|Promise<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>, IVideos]>|[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>, IVideos] {
        let moviesUpComing$ = this.ms.getUpComingMovies();
        let moviesNowPlaying$ = this.ms.getNowPlayingMovies();
        let featuredVideo$ = moviesNowPlaying$
            .map(res => {
                return res.results[0].id;
            })
            .mergeMap(id => this.ms.getMovieVideos(id.toString()));
        return Observable.forkJoin([moviesUpComing$, moviesNowPlaying$, featuredVideo$]);

    }

}

