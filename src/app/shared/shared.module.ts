/**
 * shared.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from "./movie-card";
import { HttpModule } from "@angular/http";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MovieCardComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
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