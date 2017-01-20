/**
 * hammer.config
 */

import { HammerGestureConfig } from "@angular/platform-browser";


export class MyHammerConfig extends HammerGestureConfig  {
    // https://github.com/hammerjs/hammer.js/issues/1014
    buildHammer(element: HTMLElement) {
        let mc = new Hammer(element, {
            touchAction: "pan-y",
        });
        return mc;
    }
}
