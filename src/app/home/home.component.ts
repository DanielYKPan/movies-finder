/**
 * home.component
 */

import { Component, OnInit } from "@angular/core";
import { MovieService } from "../+movie/movie.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MovieService],
})
export class HomeComponent implements OnInit {

    constructor( private movieService: MovieService ) {
    }

    ngOnInit(): void {
    }
}
