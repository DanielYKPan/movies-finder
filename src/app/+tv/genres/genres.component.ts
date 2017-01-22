/**
 * genres.component
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { PaginatedResult, ISeries } from "../../model";
import 'rxjs/add/operator/switchMap';
import { TVService } from "../tv.service";

@Component({
    selector: 'app-series-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss']
})

export class GenresComponent implements OnInit, OnDestroy {

    title: string;
    series: PaginatedResult<ISeries[]>;
    searchResult: PaginatedResult<ISeries[]>;

    private getSeriesSub: Subscription;
    private routerEventsSub: Subscription;
    private searchSeriesSub: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private tvService: TVService ) {
    }

    ngOnInit(): void {

        // work around: Changing route doesn't scroll to top in the new page #7791
        this.routerEventsSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(( event ) => {
                //this.element.nativeElement.scrollIntoView();
                document.body.scrollTop = 0;
            });

        this.getSeriesSub = this.route.data.subscribe(
            ( data: {res: {'paginatedResult': PaginatedResult<ISeries[]>, 'title': string}} ) => {
                this.searchSeries(null);
                this.series = data.res.paginatedResult;
                this.title = data.res.title;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.getSeriesSub)
            this.getSeriesSub.unsubscribe();

        if (this.routerEventsSub)
            this.routerEventsSub.unsubscribe();

        if (this.searchSeriesSub)
            this.searchSeriesSub.unsubscribe();
    }

    searchSeries( searchTerm: string ): void {
        if (!searchTerm) {
            this.searchResult = null;
            return;
        }

        this.searchSeriesSub = this.tvService.searchSeries(searchTerm).subscribe(
            data => {
                this.searchResult = data;
            }
        );
    }
}
