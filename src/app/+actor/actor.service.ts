/**
 * actor.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http, URLSearchParams, Response } from "@angular/http";
import { Observable } from "rxjs";
import { IActor, ICredits, PaginatedResult } from "../model";

@Injectable()
export class ActorService extends BaseService {

    constructor( private http: Http ) {
        super();
    }

    getPopularActors(): Observable<PaginatedResult<IActor[]>>{
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        let paginatedResult: PaginatedResult<IActor[]> = new PaginatedResult<IActor[]>();
        return this.http.get('https://api.themoviedb.org/3/person/popular', {search})
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

    /* Get actor's details */
    getActorDetails( id: string ): Observable<IActor> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/person/' + id, {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }

    /* Get the movie credits for a person */
    getActorMovieCredits(id: string): Observable<ICredits> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.http.get('https://api.themoviedb.org/3/person/' + id + '/movie_credits', {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }
}
