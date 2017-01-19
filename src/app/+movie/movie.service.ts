/**
 * movie.service
 */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { IGenre, PaginatedResult, IMovie, IMovieDetails, ICredits, IMovieVideos } from "./model";

@Injectable()
export class MovieService {

    private readonly apikey: string;

    constructor( private http: Http ) {
        this.apikey = '0ea0b3ae1ad79cc9e6354410580840c3';
    }

    /* Get Popular Movie List */
    getPopular(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/discover/movie';
        let queries = [{name: 'sort_by', value: 'popularity.desc'}];
        return this.getMovies(url, queries);
    }

    /* Get Top Rated Movies */
    getTopRatedMovies(): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/movie/top_rated';
        return this.getMovies(url);
    }

    /* Get Movies By Genre */
    getMoviesByGenre( id: string ): Observable<PaginatedResult<IMovie[]>> {
        let url = 'https://api.themoviedb.org/3/genre/' + id + '/movies';
        return this.getMovies(url);
    }

    /* Get Movie Genres */
    getGenres(): Observable<IGenre[]> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/genre/movie/list', {search})
            .map(( res: Response ) => {
                let value = res.json();
                return value.genres;
            });
    }

    /* Get Movie Details */
    getMovie( id: string ): Observable<IMovieDetails> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/movie/' + id, {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }

    /* Get Movie Credits including movie's casts and crew */
    getMovieCredits( id: string ): Observable<ICredits> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits', {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }

    /* Get the videos that have been added to a movie.  */
    getMovieVideos( id: string ): Observable<IMovieVideos> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/videos', {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }

    /* Get a list of similar movies */
    getSimilarMovies( id: string ): Observable<any> {
        let url = 'https://api.themoviedb.org/3/movie/' + id + '/similar';
        return this.getMovies(url);
    }

    private getMovies( url: string, queries?: Array<{name: string, value: string}> ): Observable<PaginatedResult<IMovie[]>> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);

        if (queries) {
            for (let query of queries) {
                search.set(query.name, query.value);
            }
        }

        let paginatedResult: PaginatedResult<IMovie[]> = new PaginatedResult<IMovie[]>();
        return this.http.get(url, {search})
            .map(( res: Response ) => {
                let value = res.json();
                paginatedResult.result = value.results;
                paginatedResult.pagination = {
                    CurrentPage: value.page,
                    ItemsPerPage: paginatedResult.result.length,
                    TotalItems: value.total_results,
                    TotalPages: value.total_pages
                };

                return paginatedResult;
            });
    }
}
