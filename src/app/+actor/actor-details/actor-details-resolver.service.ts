/**
 * actor-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IActor, IActorCredits } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorDetailsResolver implements Resolve<[IActor, IActorCredits]> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[IActor, IActorCredits]>|Promise<[IActor, IActorCredits]>|[IActor, IActorCredits] {
        let actor_id = route.params['id'];
        let actor$ = this.as.getActorDetails(actor_id);
        let actor_movie_credits$ = this.as.getActorMovieCredits(actor_id);
        return Observable.forkJoin([actor$, actor_movie_credits$]);
    }
}
