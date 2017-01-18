/**
 * shared.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
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
    ]
})
export class SharedModule {
}