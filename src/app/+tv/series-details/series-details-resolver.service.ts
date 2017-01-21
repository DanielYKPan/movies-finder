/**
 * series-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { ISeriesDetails, IVideos } from "../../model";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TVService } from "../tv.service";

@Injectable()
export class SeriesDetailsResolver implements Resolve<[ISeriesDetails, IVideos]> {

    constructor( private tvs: TVService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[ISeriesDetails, IVideos]>|Promise<[ISeriesDetails, IVideos]>|[ISeriesDetails, IVideos] {
        let series_id = route.params['id'];
        let series$ = this.tvs.getSeriesDetails(series_id);
        let series_videos$ = this.tvs.getSeriesVideos(series_id);
        return Observable.forkJoin([series$, series_videos$]);
    }
}
