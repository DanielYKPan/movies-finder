/**
 * actors-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, IPerson } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorsResolver implements Resolve<PaginatedResult<IPerson[]>> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<PaginatedResult<IPerson[]>>|Promise<PaginatedResult<IPerson[]>>|PaginatedResult<IPerson[]> {
        return this.as.getPopularActors();
    }
}
