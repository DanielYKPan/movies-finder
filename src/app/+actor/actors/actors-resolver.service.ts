/**
 * actors-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, IPersonDetails } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorsResolver implements Resolve<PaginatedResult<IPersonDetails[]>> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<PaginatedResult<IPersonDetails[]>>|Promise<PaginatedResult<IPersonDetails[]>>|PaginatedResult<IPersonDetails[]> {
        return this.as.getPopularActors();
    }
}
