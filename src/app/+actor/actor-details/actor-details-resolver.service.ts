/**
 * actor-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IPersonDetails } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorDetailsResolver implements Resolve<IPersonDetails> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<IPersonDetails>|Promise<IPersonDetails>|IPersonDetails {
        let actor_id = route.params['id'];
        return this.as.getActorDetails(actor_id);
    }
}
