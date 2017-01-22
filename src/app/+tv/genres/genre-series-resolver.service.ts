/**
 * genre-movies-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, ISeries } from "../../model";
import { Observable } from "rxjs";
import { TVService } from "../tv.service";

@Injectable()
export class GenreSeriesResolver implements Resolve<{'paginatedResult': PaginatedResult<ISeries[]>, 'title': string}> {

    constructor( private tvs: TVService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<{paginatedResult: PaginatedResult<ISeries[]>, title: string}>|Promise<{paginatedResult: PaginatedResult<ISeries[]>, title: string}>|{paginatedResult: PaginatedResult<ISeries[]>, title: string} {
        let id = route.params['id'];
        let title = route.params['name'];

        return this.tvs.getSeriesByGenre(id).map( res => {
            return {
                'paginatedResult': res,
                'title': title
            }
        });
    }

}
