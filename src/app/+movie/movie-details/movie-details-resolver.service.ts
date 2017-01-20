/**
 * movie-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { MovieService } from "../movie.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IMovieDetails, IMovieCredits, IMovieVideos, PaginatedResult, IMovie, IReview } from "../../model";
import { Observable } from "rxjs";

@Injectable()
export class MovieDetailsResolver implements Resolve<[IMovieDetails, IMovieCredits, IMovieVideos, PaginatedResult<IMovie[]>, PaginatedResult<IReview[]>]> {

    constructor( private ms: MovieService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[IMovieDetails, IMovieCredits, IMovieVideos, PaginatedResult<IMovie[]>, PaginatedResult<IReview[]>]>|Promise<[IMovieDetails, IMovieCredits, IMovieVideos, PaginatedResult<IMovie[]>, PaginatedResult<IReview[]>]>|[IMovieDetails, IMovieCredits, IMovieVideos, PaginatedResult<IMovie[]>, PaginatedResult<IReview[]>] {
        let movie_id = route.params['id'];
        let movie$ = this.ms.getMovie(movie_id);
        let movie_credits$ = this.ms.getMovieCredits(movie_id);
        let movie_videos$ = this.ms.getMovieVideos(movie_id);
        let movie_similar$ = this.ms.getSimilarMovies(movie_id);
        let movie_reviews$ = this.ms.getMovieReviews(movie_id);
        return Observable.forkJoin([movie$, movie_credits$, movie_videos$, movie_similar$, movie_reviews$]);
    }

}
