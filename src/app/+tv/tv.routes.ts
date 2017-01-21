/**
 * tv.routes
 */

import { TVCenterComponent } from "./tv-center.component";
import { SeriesComponent } from "./series";

export const routes = [
    {
        path: '',
        component: TVCenterComponent,
        children: [
            {
                path: '',
                component: SeriesComponent,
            }
        ]
    },
];
