/**
 * series-resolver.service
 */

import { Injectable } from '@angular/core';
import { ISeries, PaginatedResult } from "../../model";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TVService } from "../tv.service";

@Injectable()
export class SeriesResolver implements Resolve<[PaginatedResult<ISeries[]>, PaginatedResult<ISeries[]>]> {

    constructor( private tvs: TVService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[PaginatedResult<ISeries[]>, PaginatedResult<ISeries[]>]>|Promise<[PaginatedResult<ISeries[]>, PaginatedResult<ISeries[]>]>|[PaginatedResult<ISeries[]>, PaginatedResult<ISeries[]>] {
        let popularList$ = this.tvs.getPopular();
        let topRatedList$ = this.tvs.getTopRatedSeries();

        return Observable.forkJoin([popularList$, topRatedList$]);
    }
}
