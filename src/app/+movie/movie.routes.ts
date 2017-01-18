/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';
import { MoviesComponent } from "./movies";
import { GenresComponent } from "./genres";

export const routes = [
    {
        path: '',
        component: MovieCenterComponent,
        children: [
            {path: '', component: MoviesComponent},
            {path: 'genres/:id/:name', component: GenresComponent},
        ]
    },
];