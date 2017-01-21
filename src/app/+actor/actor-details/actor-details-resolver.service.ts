/**
 * actor-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IPerson } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorDetailsResolver implements Resolve<IPerson> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<IPerson>|Promise<IPerson>|IPerson {
        let actor_id = route.params['id'];
        return this.as.getActorDetails(actor_id);
    }
}
