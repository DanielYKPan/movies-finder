/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseService } from "../base.service";
import { Observable } from "rxjs";
import { PaginatedResult, ISeries, IGenre, ISeriesDetails } from "../model";

@Injectable()
export class TVService extends BaseService {

    constructor( protected http: Http ) {
        super(http);
    }

    /* Get popular tv series */
    getPopular(): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/discover/tv';
        let queries = [{name: 'sort_by', value: 'popularity.desc'}];
        return this.getPaginatedResult<ISeries>(url, queries);
    }

    /* Get top rated series */
    getTopRatedSeries(): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/tv/top_rated';
        return this.getPaginatedResult<ISeries>(url);
    }

    /* Get series by genre */
    getSeriesByGenre( id: string ): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/discover/tv';
        let queries = [
            {name: 'with_genres', value: id},
            {name: 'sort_by', value: 'popularity.desc'}
        ];
        return this.getPaginatedResult<ISeries>(url, queries);
    }

    /* Get Series genres */
    getGenres(): Observable<{genres: IGenre[]}> {
        let url = 'https://api.themoviedb.org/3/genre/tv/list';
        return this.getResult<{genres: IGenre[]}>(url);
    }

    /* Get Movie Details */
    getSeriesDetails( id: string ): Observable<ISeriesDetails> {
        let url = 'https://api.themoviedb.org/3/tv/' + id;
        return this.getResult<ISeriesDetails>(url);
    }

    /* Search for series */
    searchSeries( searchTerm: string ): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/search/tv';
        let queries = [
            {name: 'query', value: searchTerm},
            {name: 'sort_by', value: 'popularity.desc'}
        ];
        return this.getPaginatedResult<ISeries>(url, queries);
    }
}
