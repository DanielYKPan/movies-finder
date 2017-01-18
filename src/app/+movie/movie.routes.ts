/**
 * movie.routes
 */

import { MovieCenterComponent } from './movie-center.component';

export const routes = [
    {
        path: '',
        children: [
            {path: '', component: MovieCenterComponent},
        ]
    },
];