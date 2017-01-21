/**
 * actor-details-resolver.service
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IPerson, IActorCredits } from "../../model";
import { Observable } from "rxjs";
import { ActorService } from "../actor.service";

@Injectable()
export class ActorDetailsResolver implements Resolve<[IPerson, IActorCredits]> {

    constructor( private as: ActorService ) {
    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<[IPerson, IActorCredits]>|Promise<[IPerson, IActorCredits]>|[IPerson, IActorCredits] {
        let actor_id = route.params['id'];
        let actor$ = this.as.getActorDetails(actor_id);
        let actor_movie_credits$ = this.as.getActorMovieCredits(actor_id);
        return Observable.forkJoin([actor$, actor_movie_credits$]);
    }
}
