/**
 * movie-details.component
 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../movie.service";

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {

    constructor( private route: ActivatedRoute,
                 private movieService: MovieService ) {
    }

    ngOnInit(): void {
    }
}
