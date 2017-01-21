/**
 * movie-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { MovieService } from "../movie.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IMovieDetails } from "../../model";
import { Observable } from "rxjs";

@Injectable()
export class MovieDetailsResolver implements Resolve<IMovieDetails> {

    constructor( private ms: MovieService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<IMovieDetails>|Promise<IMovieDetails>|IMovieDetails {
        let movie_id = route.params['id'];
        return this.ms.getMovie(movie_id);
    }

}
