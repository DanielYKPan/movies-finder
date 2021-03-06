/**
 * actors.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IPerson, PaginatedResult } from "../../model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-actor-list',
    templateUrl: './actors.component.html',
    styleUrls: ['./actors.component.scss']
})

export class ActorsComponent implements OnInit, OnDestroy {

    actors: Array<IPerson>;
    private getActorsSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router, ) {
    }

    ngOnInit(): void {

        this.getActorsSub = this.route.data.subscribe(
            ( data: {actors: PaginatedResult<IPerson[]>} ) => {
                this.actors = data.actors.results;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getActorsSub)
            this.getActorsSub.unsubscribe();
    }

    checkActorDetails( id: number ): void {
        this.router.navigate(['/actors', id]);
    }
}
