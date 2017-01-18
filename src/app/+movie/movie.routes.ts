/**
 * movie.routes
 */

import { MovieComponent } from './movie.component';

export const routes = [
    {
        path: '',
        children: [
            {path: '', component: MovieComponent},
        ]
    },
];