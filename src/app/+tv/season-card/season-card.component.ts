/**
 * season-card.component
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { ISeriesSeason } from "../../model";

@Component({
    selector: 'app-season-card',
    templateUrl: './season-card.component.html',
    styleUrls: ['./season-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SeasonCardComponent implements OnInit {

    @Input() season: ISeriesSeason;

    constructor() {
    }

    ngOnInit(): void {
    }
}
