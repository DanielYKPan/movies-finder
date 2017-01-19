/**
 * actor.routes
 */
import { ActorCenterComponent } from "./actor-center.component";
import { ActorDetailsComponent } from "./actor-details";
import { ActorsComponent } from "./actors";

export const routes = [
    {
        path: '',
        component: ActorCenterComponent,
        children: [
            {path: '', component: ActorsComponent},
            {path: ':id', component: ActorDetailsComponent},
        ]
    },
];