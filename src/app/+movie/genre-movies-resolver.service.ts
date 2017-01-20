/**
 * genre-movies-resolver.service
 */

import { Injectable } from '@angular/core';
import { MovieService } from "./movie.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, IMovie } from "../model";
import { Observable } from "rxjs";

@Injectable()
export class GenreMoviesResolver implements Resolve<{'paginatedResult': PaginatedResult<IMovie[]>, 'title': string}> {

    constructor( private mc: MovieService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<{paginatedResult: PaginatedResult<IMovie[]>, title: string}>|Promise<{paginatedResult: PaginatedResult<IMovie[]>, title: string}>|{paginatedResult: PaginatedResult<IMovie[]>, title: string} {
        let id = route.params['id'];
        let title = route.params['name'];

        return this.mc.getMoviesByGenre(id).map( res => {
            return {
                'paginatedResult': res,
                'title': title
            }
        });
    }

}
