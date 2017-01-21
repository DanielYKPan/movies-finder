/**
 * tv.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../shared";
import { routes } from './tv.routes';
import { TVCenterComponent } from "./tv-center.component";
import { SeriesComponent, SeriesResolver } from "./series";
import { TVService } from "./tv.service";
import { GenresComponent, GenreSeriesResolver } from "./genres";
import { SeriesDetailsComponent, SeriesDetailsResolver } from "./series-details";
import { SeasonCardComponent } from "./season-card";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        TVCenterComponent,
        SeriesComponent,
        SeriesDetailsComponent,
        GenresComponent,
        SeasonCardComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        TVService,
        SeriesResolver,
        GenreSeriesResolver,
        SeriesDetailsResolver,
    ]
})
export class TVModule {
    public static routes = routes;
}