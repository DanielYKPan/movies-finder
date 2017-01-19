/**
 * actor-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActorService } from "../actor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { IActor } from "../../model";

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss']
})

export class ActorDetailsComponent implements OnInit, OnDestroy {

    actor: IActor;
    private getActorSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private actorService: ActorService ) {
    }

    ngOnInit(): void {
        this.getActorSub = this.route.params
            .switchMap(( params: Params ) => {
                let actor_id = params['id'];
                return this.actorService.getActorDetails(actor_id);
            })
            .subscribe(
                res => {
                    this.actor = res;
                }
            );
    }

    ngOnDestroy(): void {
        if (this.getActorSub)
            this.getActorSub.unsubscribe();
    }
}
