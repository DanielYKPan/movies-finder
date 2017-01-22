/**
 * series-card.component
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { ISeries } from "../../model";

@Component({
    selector: 'app-series-card',
    templateUrl: './series-card.component.html',
    styleUrls: ['./series-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SeriesCardComponent implements OnInit {

    @Input() series: ISeries;

    constructor() {
    }

    ngOnInit(): void {
    }
}
