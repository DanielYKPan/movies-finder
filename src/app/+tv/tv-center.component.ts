/**
 * tv-center.component
 */

import { Component, OnInit } from "@angular/core";
import { IGenre } from "../model";
import { Subscription } from "rxjs";
import { TVService } from "./tv.service";

@Component({
    selector: 'app-tv-center',
    templateUrl: './tv-center.component.html',
    styleUrls: ['./tv-center.component.scss']
})

export class TVCenterComponent implements OnInit {

    genres: IGenre[];
    private getGenresSub: Subscription;

    constructor( private tvService: TVService ) {
    }

    ngOnInit(): void {
        this.getGenresSub = this.tvService.getGenres().subscribe(
            res => this.genres = res.genres
        );
    }

    ngOnDestroy(): void {
        if(this.getGenresSub)
            this.getGenresSub.unsubscribe();
    }
}
