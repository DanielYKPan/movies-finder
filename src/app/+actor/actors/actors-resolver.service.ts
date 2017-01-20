/**
 * actors-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PaginatedResult, IActor } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorsResolver implements Resolve<PaginatedResult<IActor[]>> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<PaginatedResult<IActor[]>>|Promise<PaginatedResult<IActor[]>>|PaginatedResult<IActor[]> {
        return this.as.getPopularActors();
    }
}
