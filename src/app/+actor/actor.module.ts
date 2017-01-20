/**
 * actor.module
 */

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared";
import { routes } from './actor.routes';
import { ActorCenterComponent } from "./actor-center.component";
import { ActorDetailsComponent, ActorDetailsResolver } from "./actor-details";
import { ActorService } from "./actor.service";
import { ActorsComponent, ActorsResolver } from "./actors";


@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        ActorCenterComponent,
        ActorsComponent,
        ActorDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        ActorService,
        ActorsResolver,
        ActorDetailsResolver,
    ]
})
export class ActorModule {
    public static routes = routes;
}