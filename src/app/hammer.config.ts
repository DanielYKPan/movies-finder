/**
 * hammer.config
 */

import { HammerGestureConfig } from "@angular/platform-browser";


export class MyHammerConfig extends HammerGestureConfig  {
    buildHammer(element: HTMLElement) {
        let mc = new Hammer(element, {
            touchAction: "pan-y",
        });
        return mc;
    }
}
