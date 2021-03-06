/**
 * movie.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { IGenre, PaginatedResult, IMovie, IMovieDetails, IVideos } from "../model";
import { BaseService } from "../base.service";

@Injectable()
export class MovieService extends BaseService {

    constructor( protected http: Http ) {
        super(http);
    }

    /* Get Popular Movie List */
    getPopular(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/discover/movie';
        let queries = [{name: 'sort_by', value: 'popularity.desc'}];
        return this.getResult<PaginatedResult<IMovie[]>>(url, queries);
    }

    /* Get Top Rated Movies */
    getTopRatedMovies(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/movie/top_rated';
        return this.getResult<PaginatedResult<IMovie[]>>(url);
    }

    /* Get Movies By Genre */
    getMoviesByGenre( id: string ): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/discover/movie';
        let queries = [
            {name: 'with_genres', value: id},
            {name: 'sort_by', value: 'popularity.desc'}
        ];
        return this.getResult<PaginatedResult<IMovie[]>>(url, queries);
    }

    /* Get Movie Genres */
    getGenres(): Observable<{genres: IGenre[]}> {
        let url = 'https://api.themoviedb.org/3/genre/movie/list';
        return this.getResult<{genres: IGenre[]}>(url);
    }

    /* Get Movie Details */
    getMovie( id: string ): Observable<IMovieDetails> {
        let url = 'https://api.themoviedb.org/3/movie/' + id;
        let queries = [
            {name: 'append_to_response', value: 'credits,videos,reviews,similar'}
        ];
        return this.getResult<IMovieDetails>(url, queries);
    }

    /* Get the videos that have been added to a movie.  */
    getMovieVideos( id: string ): Observable<IVideos> {
        let url = 'https://api.themoviedb.org/3/movie/' + id + '/videos';
        return this.getResult<IVideos>(url);
    }

    /* Get a list of upcoming movies in theatres. */
    getUpComingMovies(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/movie/upcoming';
        let queries = [
            {name: 'region', value: 'US'},
        ];
        return this.getResult<PaginatedResult<IMovie[]>>(url, queries);
    }

    /* Get a list of movies in theatres */
    getNowPlayingMovies(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/movie/now_playing';
        let queries = [
            {name: 'region', value: 'US'},
        ];
        return this.getResult<PaginatedResult<IMovie[]>>(url, queries);
    }

    /* Search for movies. */
    searchMovies( searchTerm: string ): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/search/movie';
        let queries = [
            {name: 'query', value: searchTerm},
            {name: 'sort_by', value: 'popularity.desc'}
        ];
        return this.getResult<PaginatedResult<IMovie[]>>(url, queries);
    }

}
