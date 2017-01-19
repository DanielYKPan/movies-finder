/**
 * actor.routes
 */
import { ActorCenterComponent } from "./actor-center.component";
import { ActorDetailsComponent } from "./actor-details";

export const routes = [
    {
        path: '',
        component: ActorCenterComponent,
        children: [
            {path: ':id', component: ActorDetailsComponent},
        ]
    },
];