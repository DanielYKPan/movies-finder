/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './movie.routes';
import { MovieComponent } from './movie.component';
import { HttpModule } from "@angular/http";
import { MovieService } from "./movie.service";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
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
