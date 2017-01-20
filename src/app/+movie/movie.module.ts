/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './movie.routes';
import { MovieCenterComponent } from './movie-center.component';
import { MovieService } from "./movie.service";
import { SharedModule } from "../shared";
import { MoviesComponent, MoviesResolver } from "./movies";
import { GenresComponent, GenreMoviesResolver } from "./genres";
import { MovieDetailsComponent, MovieDetailsResolver } from "./movie-details";

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
        MoviesResolver,
        GenreMoviesResolver,
        MovieDetailsResolver
    ]
})
export class MovieModule {
    public static routes = routes;
}
