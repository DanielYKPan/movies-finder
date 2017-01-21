/**
 * tv.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../shared";
import { routes } from './tv.routes';
import { TVCenterComponent } from "./tv-center.component";
import { SeriesComponent } from "./series";
import { TVService } from "./tv.service";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        TVCenterComponent,
        SeriesComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        TVService
    ]
})
export class TVModule {
    public static routes = routes;
}