/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';
import { MoviesComponent } from "./movies/movies.component";

export const routes = [
    {
        path: '',
        component: MovieCenterComponent,
        children: [
            {path: '', component: MoviesComponent},
        ]
    },
];