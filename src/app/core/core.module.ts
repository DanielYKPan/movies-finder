/**
 * core.module
 */

import { NgModule }      from '@angular/core';
import { SharedModule } from "../shared";
import { HeaderComponent } from "./header";

@NgModule({
    imports: [SharedModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    providers: []
})
export class CoreModule {
}