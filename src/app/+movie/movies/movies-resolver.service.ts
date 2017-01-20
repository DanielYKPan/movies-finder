/**
 * movies-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, IMovie } from "../../model";
import { Observable } from "rxjs";
import { MovieService } from "../movie.service";

@Injectable()
export class MoviesResolver implements Resolve<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>]> {

    constructor( private mc: MovieService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>]>|Promise<[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>]>|[PaginatedResult<IMovie[]>, PaginatedResult<IMovie[]>] {
        let popularList$ = this.mc.getPopular();
        let topRatedList$ = this.mc.getTopRatedMovies();

        return Observable.forkJoin([popularList$, topRatedList$]);
    }

}
