/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './movie.routes';
import { MovieCenterComponent } from './movie-center.component';
import { MovieService } from "./movie.service";
import { SharedModule } from "../shared";
import { MoviesComponent } from "./movies";
import { GenresComponent } from "./genres";
import { MovieDetailsComponent } from "./movie-details";
import { MoviesResolver } from "./movies-resolver.service";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieCenterComponent,
        MoviesComponent,
        GenresComponent,
        MovieDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        MovieService,
        MoviesResolver
    ]
})
export class MovieModule {
    public static routes = routes;
}
