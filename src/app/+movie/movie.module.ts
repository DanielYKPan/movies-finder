/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './movie.routes';
import { MovieComponent } from './movie.component';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class MovieModule {
    public static routes = routes;
}
