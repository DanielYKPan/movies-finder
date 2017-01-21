/**
 * tv.routes
 */

import { TVCenterComponent } from "./tv-center.component";
import { SeriesComponent, SeriesResolver } from "./series";
import { GenresComponent, GenreSeriesResolver } from "./genres";

export const routes = [
    {
        path: '',
        component: TVCenterComponent,
        children: [
            {
                path: '',
                component: SeriesComponent,
                resolve: {
                    res: SeriesResolver
                }
            },
            {
                path: 'genres/:id/:name',
                component: GenresComponent,
                resolve: {
                    res: GenreSeriesResolver
                }
            },
        ]
    },
];
