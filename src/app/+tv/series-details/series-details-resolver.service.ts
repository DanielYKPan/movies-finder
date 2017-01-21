/**
 * series-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { ISeriesDetails } from "../../model";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TVService } from "../tv.service";

@Injectable()
export class SeriesDetailsResolver implements Resolve<ISeriesDetails> {

    constructor( private tvs: TVService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ISeriesDetails>|Promise<ISeriesDetails>|ISeriesDetails {
        let series_id = route.params['id'];
        return this.tvs.getSeriesDetails(series_id);
    }
}
