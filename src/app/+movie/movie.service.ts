/**
 * movie.service
 */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { IGenre, PaginatedResult, IMovie } from "./model";

@Injectable()
export class MovieService {

    private readonly apikey: string;

    constructor( private http: Http ) {
        this.apikey = '0ea0b3ae1ad79cc9e6354410580840c3';
    }

    /* Get Popular Movie List */
    getPopular(): Observable<PaginatedResult<IMovie[]>> {
        let search = new URLSearchParams();
        search.set('sort_by', 'popularity.desc');
        search.set('api_key', this.apikey);

        let paginatedResult: PaginatedResult<IMovie[]> = new PaginatedResult<IMovie[]>();

        return this.http.get('https://api.themoviedb.org/3/discover/movie', {search})
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

    /*
     * Extract data from server response
     * */
    private extractData( res: Response ) {
        let value = res.json();
        return value || {};
    }
}
