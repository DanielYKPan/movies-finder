/**
 * shared.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from "./movie-card";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MovieCardComponent,
    ]
})
export class SharedModule {
}