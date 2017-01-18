/**
 * movie.component
 */

import { Component, OnInit } from '@angular/core';
import { MovieService } from "./movie.service";

@Component({
    selector: 'app-movie',
    templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {

    constructor( private movieService: MovieService ) {
    }

    ngOnInit() {
        this.movieService.getPopular().subscribe(
            data => console.log(data)
        );
    }
}
