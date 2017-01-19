/**
 * actor.module
 */

import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared";
import { routes } from './actor.routes';
import { ActorCenterComponent } from "./actor-center.component";
import { ActorDetailsComponent } from "./actor-details/actor-details.component";


@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        ActorCenterComponent,
        ActorDetailsComponent,
    ],
    imports: [
        SharedModule,
        HttpModule,
        RouterModule.forChild(routes),
    ],
    providers: []
})
export class ActorModule {
    public static routes = routes;
}