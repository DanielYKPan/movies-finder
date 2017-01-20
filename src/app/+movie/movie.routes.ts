/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';
import { MoviesComponent, MoviesResolver } from "./movies";
import { GenresComponent, GenreMoviesResolver } from "./genres";
import { MovieDetailsComponent, MovieDetailsResolver } from "./movie-details";

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