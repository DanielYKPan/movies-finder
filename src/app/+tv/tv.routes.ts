/**
 * tv.routes
 */

import { TVCenterComponent } from "./tv-center.component";
import { SeriesComponent, SeriesResolver } from "./series";

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
            }
        ]
    },
];
