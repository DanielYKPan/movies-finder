/**
 * genres.component
 */

import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../../model";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-movie-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss']
})

export class GenresComponent implements OnInit, OnDestroy {

    title: string;
    movies: PaginatedResult<IMovie[]>;

    private getMoviesSub: Subscription;
    private routerEventsSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private element: ElementRef ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                //this.element.nativeElement.scrollIntoView();
                document.body.scrollTop = 0;
            });

        this.getMoviesSub = this.route.data.subscribe(
            (data: {res: {'paginatedResult': PaginatedResult<IMovie[]>, 'title': string}}) => {
                this.movies = data.res.paginatedResult;
                this.title = data.res.title;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();

        if (this.routerEventsSub)
            this.routerEventsSub.unsubscribe();
    }
}
