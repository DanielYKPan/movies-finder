/**
 * actors.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActorService } from "../actor.service";
import { Subscription } from "rxjs";
import { IActor } from "../../model";

@Component({
    selector: 'app-actor-list',
    templateUrl: './actors.component.html',
    styleUrls: ['./actors.component.scss']
})

export class ActorsComponent implements OnInit, OnDestroy {

    actors: Array<IActor>;
    private getActorsSub: Subscription;

    constructor( private actorService: ActorService ) {
    }

    ngOnInit(): void {
        this.getActorsSub = this.actorService.getPopularActors().subscribe(
            data => this.actors = data.result
        );
    }

    ngOnDestroy(): void {
        if (this.getActorsSub)
            this.getActorsSub.unsubscribe();
    }
}
