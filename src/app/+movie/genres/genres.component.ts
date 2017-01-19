/**
 * genres.component
 */

import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { PaginatedResult, IMovie } from "../../model";
import { MovieService } from "../movie.service";
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
                 private element: ElementRef,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                this.element.nativeElement.scrollIntoView();
            });

        this.getMoviesSub = this.route.params
            .switchMap(( params: Params ) => {
                this.title = params['name'];
                return this.movieService.getMoviesByGenre(params['id'])
            })
            .subscribe(( movies: PaginatedResult<IMovie[]> ) => this.movies = movies);
    }

    ngOnDestroy(): void {
        if (this.getMoviesSub)
            this.getMoviesSub.unsubscribe();

        if (this.routerEventsSub)
            this.routerEventsSub.unsubscribe();
    }
}
