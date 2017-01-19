/**
 * actor.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http, URLSearchParams, Response } from "@angular/http";
import { Observable } from "rxjs";
import { IActor } from "../model";

@Injectable()
export class ActorService extends BaseService {

    constructor( private http: Http ) {
        super();
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
}
