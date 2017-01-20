/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';
import { MoviesComponent } from "./movies";
import { GenresComponent } from "./genres";
import { MovieDetailsComponent } from "./movie-details";
import { MoviesResolver } from "./movies-resolver.service";
import { GenreMoviesResolver } from "./genre-movies-resolver.service";
import { MovieDetailsResolver } from "./movie-details-resolver.service";

export const routes = [
    {
        path: '',
        component: MovieCenterComponent,
        children: [
            {
                path: '',
                component: MoviesComponent,
                resolve: {
                    res: MoviesResolver
                }
            },
            {
                path: ':id',
                component: MovieDetailsComponent,
                resolve: {
                    res: MovieDetailsResolver
                }
            },
            {
                path: 'genres/:id/:name',
                component: GenresComponent,
                resolve: {
                    res: GenreMoviesResolver
                }
            },
        ]
    },
];