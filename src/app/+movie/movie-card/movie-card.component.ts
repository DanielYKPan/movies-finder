/**
 * movie-card.component
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { IMovie } from "../../model";

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MovieCardComponent implements OnInit {

    @Input() movie: IMovie;

    constructor() {
    }

    ngOnInit(): void {
    }
}
