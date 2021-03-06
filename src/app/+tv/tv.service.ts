/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { ISeries, PaginatedResult, IGenre, ISeriesDetails, ISeriesSeasonDetails } from "../model";

@Injectable()
export class TVService extends BaseService {

    constructor( protected http: Http ) {
        super(http);
    }

    /* Get popular tv series */
    getPopular(): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/discover/tv';
        let queries = [{name: 'sort_by', value: 'popularity.desc'}];
        return this.getResult<PaginatedResult<ISeries[]>>(url, queries);
    }

    /* Get top rated series */
    getTopRatedSeries(): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/tv/top_rated';
        return this.getResult<PaginatedResult<ISeries[]>>(url);
    }

    /* Get series by genre */
    getSeriesByGenre( id: string ): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/discover/tv';
        let queries = [{name: 'with_genres', value: id}, {name: 'sort_by', value: 'popularity.desc'}];
        return this.getResult<PaginatedResult<ISeries[]>>(url, queries);
    }

    /* Get Series genres */
    getGenres(): Observable<{genres: IGenre[]}> {
        let url = 'https://api.themoviedb.org/3/genre/tv/list';
        return this.getResult<{genres: IGenre[]}>(url);
    }

    /* Get Series Details */
    getSeriesDetails( id: string ): Observable<ISeriesDetails> {
        let url = 'https://api.themoviedb.org/3/tv/' + id;
        let queries = [{name: 'append_to_response', value: 'videos'}];
        return this.getResult<ISeriesDetails>(url, queries);
    }

    /* Search for series */
    searchSeries( searchTerm: string ): Observable<PaginatedResult<ISeries[]>> {
        let url = 'https://api.themoviedb.org/3/search/tv';
        let queries = [{name: 'query', value: searchTerm}, {name: 'sort_by', value: 'popularity.desc'}];
        return this.getResult<PaginatedResult<ISeries[]>>(url, queries);
    }

    /* Get the TV season details by id */
    getSeriesSeasonDetails( series_id: number, season_num: number ): Observable<ISeriesSeasonDetails> {
        let url = 'https://api.themoviedb.org/3/tv/' + series_id + '/season/' + season_num;
        let queries = [{name: 'append_to_response', value: 'videos'}];
        return this.getResult<ISeriesSeasonDetails>(url, queries);
    }
}
