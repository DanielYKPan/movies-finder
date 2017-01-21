/**
 * actor.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http, URLSearchParams, Response } from "@angular/http";
import { Observable } from "rxjs";
import { IPerson, PaginatedResult, IActorCredits } from "../model";

@Injectable()
export class ActorService extends BaseService {

    constructor( protected http: Http ) {
        super(http);
    }

    getPopularActors(): Observable<PaginatedResult<IPerson[]>> {
        let url = 'https://api.themoviedb.org/3/person/popular';
        return this.getPaginatedResult<IPerson>(url);
    }

    /* Get actor's details */
    getActorDetails( id: string ): Observable<IPerson> {
        let url = 'https://api.themoviedb.org/3/person/' + id;
        return this.getResult<IPerson>(url);
    }

    /* Get the movie credits for a person */
    getActorMovieCredits( id: string ): Observable<IActorCredits> {
        let url = 'https://api.themoviedb.org/3/person/' + id + '/movie_credits';
        return this.getResult<IActorCredits>(url);
    }
}
