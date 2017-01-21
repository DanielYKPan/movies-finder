/**
 * actor.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { IPerson, PaginatedResult } from "../model";

@Injectable()
export class ActorService extends BaseService {

    constructor( protected http: Http ) {
        super(http);
    }

    getPopularActors(): Observable<PaginatedResult<IPerson[]>> {
        let url = 'https://api.themoviedb.org/3/person/popular';
        return this.getResult<PaginatedResult<IPerson[]>>(url);
    }

    /* Get actor's details */
    getActorDetails( id: string ): Observable<IPerson> {
        let url = 'https://api.themoviedb.org/3/person/' + id;
        let queries = [
            {name: 'append_to_response', value: 'movie_credits'}
        ];
        return this.getResult<IPerson>(url, queries);
    }
}
