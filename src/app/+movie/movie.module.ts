/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './movie.routes';
import { MovieCenterComponent } from './movie-center.component';
import { HttpModule } from "@angular/http";
import { MovieService } from "./movie.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieCenterComponent,
    ],
    imports: [
        SharedModule,
        HttpModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        MovieService
    ]
})
export class MovieModule {
    public static routes = routes;
}
