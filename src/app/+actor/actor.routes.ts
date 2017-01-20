/**
 * actor.routes
 */
import { ActorCenterComponent } from "./actor-center.component";
import { ActorDetailsComponent, ActorDetailsResolver } from "./actor-details";
import { ActorsComponent, ActorsResolver } from "./actors";

export const routes = [
    {
        path: '',
        component: ActorCenterComponent,
        children: [
            {
                path: '',
                component: ActorsComponent,
                resolve: {
                    actors: ActorsResolver
                }
            },
            {
                path: ':id',
                component: ActorDetailsComponent,
                resolve: {
                    actor: ActorDetailsResolver
                }
            },
        ]
    },
];