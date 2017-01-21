/**
 * actor-details.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { IPerson, IActorCredits, IActorCast } from "../../model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss']
})

export class ActorDetailsComponent implements OnInit, OnDestroy {

    actor: IPerson;
    movies: Array<IActorCast>;
    private getActorSub: Subscription;
    private routerEventsSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private sanitizer: DomSanitizer ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                document.body.scrollTop = 0;
            });

        this.getActorSub = this.route.data.subscribe(
            ( data: {actor: [IPerson, IActorCredits]} ) => {
                this.actor = data.actor[0];
                this.movies = data.actor[1].cast;
                this.actor.homepage_url = this.getHomepageUrl(this.actor.homepage);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getActorSub)
            this.getActorSub.unsubscribe();
    }

    private getHomepageUrl( url: string ): SafeResourceUrl {
        if (url.substr(0, 4) === 'http') {
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
            return this.sanitizer.bypassSecurityTrustResourceUrl('//' + url);
        }
    }
}
