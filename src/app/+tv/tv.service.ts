/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseService } from "../base.service";
import { Observable } from "rxjs";
import { PaginatedResult, ISeries, IGenre } from "../model";

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
        let url = 'https://api.themoviedb.org/3/movie/top_rated';
        return this.getPaginatedResult<ISeries>(url);
    }

    /* Get Series genres */
    getGenres(): Observable<{genres: IGenre[]}> {
        let url = 'https://api.themoviedb.org/3/genre/tv/list';
        return this.getResult<{genres: IGenre[]}>(url);
    }
}
