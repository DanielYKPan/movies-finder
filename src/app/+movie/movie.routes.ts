/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';
import { MoviesComponent } from "./movies";
import { GenresComponent } from "./genres";
import { MovieDetailsComponent } from "./movie-details";

export const routes = [
    {
        path: '',
        component: MovieCenterComponent,
        children: [
            {path: '', component: MoviesComponent},
            {path: ':id', component: MovieDetailsComponent},
            {path: 'genres/:id/:name', component: GenresComponent},
        ]
    },
];