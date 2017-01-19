/**
 * actor-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActorService } from "../actor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { IActor, IMovie } from "../../model";

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss']
})

export class ActorDetailsComponent implements OnInit, OnDestroy {

    actor: IActor;
    movies: Array<IMovie>;
    private getActorSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private actorService: ActorService ) {
    }

    ngOnInit(): void {
        this.getActorSub = this.route.params
            .switchMap(( params: Params ) => {
                let actor_id = params['id'];
                let actor$ = this.actorService.getActorDetails(actor_id);
                let actor_movie_credits$ = this.actorService.getActorMovieCredits(actor_id);
                return Observable.forkJoin([actor$, actor_movie_credits$]);
            })
            .subscribe(
                res => {
                    this.actor = res[0];
                    this.movies = res[1].cast;
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getActorSub)
            this.getActorSub.unsubscribe();
    }
}
